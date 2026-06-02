/** @format */

import { BookOpen, Calendar, FileText, GraduationCap } from "lucide-react";
import { formatNoteDate } from "../../utils/formatDate";
import { getNoteClassLevel, getNoteExamType } from "../../utils/noteFields";

const HistoryNoteItem = ({ note, isActive, onSelect }) => {
  const classLevel = getNoteClassLevel(note);
  const examType = getNoteExamType(note);

  return (
  <button
    type="button"
    onClick={() => onSelect(note)}
    className={`w-full text-left rounded-xl p-3 transition-all duration-200
    ${
      isActive
        ? "bg-purple-500/20 border border-purple-400/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
        : "bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10"
    }`}>
    <div className="flex items-start gap-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
        ${
          isActive ? "bg-purple-500/30" : "bg-white/5 border border-white/10"
        }`}>
        <FileText
          size={16}
          className={isActive ? "text-purple-300" : "text-gray-400"}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-semibold truncate ${
            isActive ? "text-purple-200" : "text-white"
          }`}>
          {note.topic}
        </p>

        {classLevel !== "" && (
          <p className="text-xs text-gray-500 truncate mt-0.5 flex items-center gap-1">
            <GraduationCap size={11} />
            Class {classLevel}
          </p>
        )}

        {examType !== "" && (
          <p className="text-xs text-gray-500 truncate mt-0.5 flex items-center gap-1">
            <BookOpen size={11} />
            {examType}
          </p>
        )}

        <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
          <Calendar size={11} />
          {formatNoteDate(note.createdAt)}
        </p>
      </div>
    </div>
  </button>
  );
};

const HistoryList = ({ notes, selectedNote, onSelect }) => (
  <>
    <div className="px-4 py-3 border-b border-white/10">
      <p className="text-sm font-semibold text-white">Your Notes</p>
      <p className="text-xs text-gray-500 mt-0.5">
        {notes.length} saved {notes.length === 1 ? "note" : "notes"}
      </p>
    </div>

    <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-2 space-y-1">
      {notes.map((note) => (
        <HistoryNoteItem
          key={note._id}
          note={note}
          isActive={selectedNote?._id === note._id}
          onSelect={onSelect}
        />
      ))}
    </div>
  </>
);

export default HistoryList;
