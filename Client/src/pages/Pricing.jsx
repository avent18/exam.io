/** @format */

import { useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HistoryNavbar } from "../components/history/HistoryLayout";
import PricingCard from "../components/pricing/PricingCard";
import { pricingPlans } from "../components/pricing/pricingPlans";
import Footer from "../components/Footer";
import { ServerUrl } from "../App";
import axios from "axios";
import { CREDITS_BEFORE_PAYMENT_KEY } from "../services/api";

const Pricing = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paying , setPaying] = useState(false);

  const handleSelectPlan = async (plan) => {
    try {
      setSelectedPlan(plan.id);
      setAmount(plan.price);
      setPaying(true);
      const result = await axios.post(
        `${ServerUrl}/api/credits/order`,
        { amount: plan.price },
        {
          withCredentials: true,
        },
      );
      if (result.data?.url) {
        if (userData?.credits != null) {
          sessionStorage.setItem(
            CREDITS_BEFORE_PAYMENT_KEY,
            String(userData.credits),
          );
        }
        window.location.href = result.data.url;
      }

      setPaying(false);
    } catch (error) {
      setPaying(false);
      console.error("Error creating checkout session:", error.response?.data || error.message);
      alert("Failed to initiate purchase. Please try again.");
    }
  };

  return (
    <div className="min-h-screen text-gray-400 overflow-hidden">
      <HistoryNavbar />

      <main className="w-full px-4 md:px-8 lg:px-10 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-purple-400 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Pick a plan that fits your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              exam prep
            </span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
            Buy credits once, generate exam-focused notes anytime. No subscription
            pressure.
          </p>
          {userData && (
            <p className="mt-4 inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
              You have{" "}
              <span className="font-semibold text-white">{userData.credits}</span>{" "}
              credits remaining
            </p>
          )}
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* FAQ / note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Each note generation uses 10 credits. Credits never expire after
            purchase. Need help choosing?{" "}
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
              Try generating a note first
            </button>
          </p>
        </motion.div>

        {selectedPlan && (
          <p className="sr-only">Selected plan: {selectedPlan}</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
