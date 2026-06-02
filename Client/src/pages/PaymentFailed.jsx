/** @format */

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { HistoryNavbar } from "../components/history/HistoryLayout";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-gray-400">
      <HistoryNavbar />

      <main className="flex items-center justify-center min-h-screen px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center rounded-2xl border border-white/10
          bg-gradient-to-br from-[#12121a] to-[#0f0f16] p-8 shadow-2xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Payment cancelled</h1>
          <p className="mt-3 text-gray-400">
            No charges were made. You can try again anytime.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90">
              <ArrowLeft size={18} />
              Back to pricing
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

export default PaymentFailed;
