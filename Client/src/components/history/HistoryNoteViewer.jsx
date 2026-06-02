/** @format */

import { motion } from "motion/react";
import { FileText } from "lucide-react";
import Sidebar from "../Sidebar";
import FinalResult from "../FinalResult";

const HistoryNoteViewer = ({ selectedNote }) => {
  if (!selectedNote) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 rounded-2xl
        bg-white/5 border border-dashed border-white/10">
        <FileText className="w-12 h-12 text-gray-600 mb-4" />
        <p className="text-gray-400 text-center px-4">
          <span className="lg:hidden">
            Tap the menu button above to browse notes
          </span>
          <span className="hidden lg:inline">
            Select a note from the left to view it
          </span>
        </p>
      </div>
    );
  }

  if (!selectedNote.content) return null;

  return (
    <motion.div
      key={selectedNote._id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:grid md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Sidebar result={selectedNote.content} />
      </div>
      <div className="md:col-span-3">
        <FinalResult result={selectedNote.content} />
      </div>
    </motion.div>
  );
};

export default HistoryNoteViewer;
