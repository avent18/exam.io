import Stripe from "stripe";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
  99: 50,
  199: 150,
  399: 500,
};

export const createCreditOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const amount = Number(req.body.amount);

    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const clientUrl = process.env.CLIENT_URL?.endsWith("/")
      ? process.env.CLIENT_URL
      : `${process.env.CLIENT_URL}/`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${clientUrl}payment-success`,
      cancel_url: `${clientUrl}payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits for Exam.io`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: String(userId),
        credits: String(CREDIT_MAP[amount]),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return res.status(400).send("Webhook signature verification failed");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const creditsToAdd = parseInt(session.metadata?.credits, 10);

    if (!userId || !creditsToAdd || Number.isNaN(creditsToAdd)) {
      console.error("Missing userId or credits in webhook metadata");
      return res.status(400).json({ error: "Invalid webhook data" });
    }

    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: creditsToAdd },
          $set: { isCreditAvailable: true },
        },
        { new: true },
      );

      if (!user) {
        console.error("User not found for ID:", userId);
        return res.status(404).json({ error: "User not found" });
      }

      console.log(
        `Added ${creditsToAdd} credits to user ${userId}. New balance: ${user.credits}`,
      );
    } catch (dbError) {
      console.error("Failed to update user credits:", dbError);
      return res.status(500).json({ error: "Failed to update credits" });
    }
  }

  return res.json({ received: true });
};
