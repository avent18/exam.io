/** @format */

import { Menu } from "lucide-react";

const MobileHistoryBar = ({ selectedNote, onOpenMenu }) => (
  <div
    className="lg:hidden fixed top-[88px] left-1/2 -translate-x-1/2 z-40
    w-[90%] max-w-7xl px-4 py-2.5
    bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl
    flex items-center gap-3">
    <button
      type="button"
      onClick={onOpenMenu}
      className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30
      text-purple-300 hover:bg-purple-500/30 transition shrink-0"
      aria-label="Open notes menu">
      <Menu size={20} />
    </button>

    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-500">History</p>
      <p className="text-sm font-medium text-white truncate">
        {selectedNote ? selectedNote.topic : "Select a note"}
      </p>
    </div>
  </div>
);

export default MobileHistoryBar;
