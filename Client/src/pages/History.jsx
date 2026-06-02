/** @format */

import { useState } from "react";
import { motion } from "motion/react";
import { useHistoryNotes } from "../hooks/useHistoryNotes";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import {
  HistoryNavbar,
  HistoryPageHeader,
  HistoryLoading,
  HistoryError,
} from "../components/history/HistoryLayout";
import MobileHistoryBar from "../components/history/MobileHistoryBar";
import MobileHistoryDrawer from "../components/history/MobileHistoryDrawer";
import HistoryList from "../components/history/HistoryList";
import HistoryNoteViewer from "../components/history/HistoryNoteViewer";
import HistoryEmptyState from "../components/history/HistoryEmptyState";

const History = () => {
  const { notes, loading, error } = useHistoryNotes();
  const [selectedNote, setSelectedNote] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useBodyScrollLock(menuOpen);

  const hasNotes = !loading && !error && notes.length > 0;

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-gray-400 pb-16">
      <HistoryNavbar />

      {hasNotes && (
        <MobileHistoryBar
          selectedNote={selectedNote}
          onOpenMenu={() => setMenuOpen(true)}
        />
      )}

      <MobileHistoryDrawer
        isOpen={menuOpen}
        notes={notes}
        selectedNote={selectedNote}
        onSelect={handleSelectNote}
        onClose={() => setMenuOpen(false)}
      />

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full px-4 md:px-6 lg:px-8 xl:px-10 ${hasNotes ? "pt-44 lg:pt-32" : "pt-32"}`}>
        <HistoryPageHeader />

        {loading && <HistoryLoading />}
        {!loading && error && <HistoryError message={error} />}
        {!loading && !error && notes.length === 0 && <HistoryEmptyState />}

        {hasNotes && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <aside
              className="hidden lg:block w-80 shrink-0 sticky top-28
              rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden">
              <HistoryList
                notes={notes}
                selectedNote={selectedNote}
                onSelect={handleSelectNote}
              />
            </aside>

            <div className="flex-1 min-w-0 w-full">
              <HistoryNoteViewer selectedNote={selectedNote} />
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default History;
