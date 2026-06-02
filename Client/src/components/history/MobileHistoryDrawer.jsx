/** @format */

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import HistoryList from "./HistoryList";

const MobileHistoryDrawer = ({
  isOpen,
  notes,
  selectedNote,
  onSelect,
  onClose,
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="lg:hidden fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
        />

        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="lg:hidden fixed top-0 left-0 z-70 h-full w-[85%] max-w-sm
          bg-[#0d0d12] border-r border-white/10 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <p className="text-base font-semibold text-white">Your Notes</p>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition"
              aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <HistoryList
              notes={notes}
              selectedNote={selectedNote}
              onSelect={onSelect}
            />
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default MobileHistoryDrawer;
