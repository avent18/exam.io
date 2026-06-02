/** @format */

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { HistoryNavbar } from "../components/history/HistoryLayout";
import { usePaymentCreditRefresh } from "../hooks/usePaymentCreditRefresh";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { status, creditsAdded, currentCredits, retryRefresh } =
    usePaymentCreditRefresh();

  return (
    <div className="min-h-screen text-gray-400">
      <HistoryNavbar />

      <main className="flex items-center justify-center min-h-screen px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center rounded-2xl border border-white/10
          bg-gradient-to-br from-[#12121a] to-[#0f0f16] p-8 shadow-2xl">
          {status === "loading" && (
            <>
              <Loader2 className="w-14 h-14 text-purple-400 animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white">Payment successful</h1>
              <p className="mt-3 text-gray-400">
                Updating your credits… hang tight.
              </p>
            </>
          )}

          {status === "updated" && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">You&apos;re all set!</h1>
              <p className="mt-3 text-gray-400">
                {creditsAdded != null && creditsAdded > 0 ? (
                  <>
                    <span className="text-emerald-400 font-semibold">
                      +{creditsAdded} credits
                    </span>{" "}
                    added to your account.
                  </>
                ) : (
                  "Your credits have been updated."
                )}
              </p>
              <div
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl
                bg-purple-500/15 border border-purple-400/30">
                <Sparkles size={18} className="text-purple-300" />
                <span className="text-white font-semibold text-lg">
                  {currentCredits} credits
                </span>
              </div>
            </>
          )}

          {status === "pending" && (
            <>
              <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white">Payment received</h1>
              <p className="mt-3 text-gray-400 text-sm">
                Credits can take a few seconds to appear. Current balance:{" "}
                <span className="text-white font-medium">{currentCredits}</span>
              </p>
              <button
                type="button"
                onClick={retryRefresh}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl
                bg-white/10 hover:bg-white/15 text-white text-sm transition">
                <RefreshCw size={16} />
                Refresh credits
              </button>
            </>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90">
              Generate notes
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white transition">
              Go home
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
