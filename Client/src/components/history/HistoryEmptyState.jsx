/** @format */

import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryEmptyState = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-24">
      <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">No notes yet</h3>
      <p className="text-gray-400 mb-6">
        Generate your first exam-focused notes to see them here.
      </p>
      <button
        onClick={() => navigate("/notes")}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500
        text-white font-medium hover:opacity-90 transition">
        Generate Notes
      </button>
    </motion.div>
  );
};

export default HistoryEmptyState;
