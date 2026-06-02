/** @format */

import React from "react";
import { getPriorityStyle, sectionThemes } from "./notes/noteTheme";

const Sidebar = ({ result }) => {
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div
      className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#16161f] to-[#101018]
      shadow-lg p-5 space-y-6 sticky top-28">
      {/* Importance badge */}
      {result.importance && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/25 p-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Exam Importance
          </p>
          <p className="text-sm font-semibold text-emerald-300 leading-snug">
            {result.importance}
          </p>
        </div>
      )}

      {/* Subtopics */}
      <section>
        <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span>📗</span> Subtopics
        </p>

        {Object.entries(result.subTopics).map(([star, topics]) => {
          const style = getPriorityStyle(star);
          return (
            <div
              key={star}
              className={`mb-3 rounded-xl border-l-4 p-3 border border-white/5 ${style.card}`}>
              <span
                className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md border mb-2 ${style.badge}`}>
                {star}
              </span>
              {topics.map((topic, idx) => (
                <p
                  key={idx}
                  className="text-xs text-gray-400 ml-1 leading-relaxed flex gap-1.5">
                  <span className={style.dot}>•</span>
                  <span>{topic}</span>
                </p>
              ))}
            </div>
          );
        })}
      </section>

      {/* Questions summary */}
      <section
        className={`rounded-xl border p-4 ${sectionThemes.rose.panel}`}>
        <p className="text-sm font-semibold text-rose-200 mb-4">
          Important Questions
        </p>

        <div
          className={`mb-3 rounded-lg border p-3 ${sectionThemes.indigo.panel}`}>
          <p
            className={`text-xs font-semibold mb-2 uppercase tracking-wide ${sectionThemes.indigo.accent}`}>
            Short
          </p>
          <ul className="space-y-1.5">
            {result.questions.short.map((t, i) => (
              <li
                key={i}
                className="text-xs text-gray-400 leading-relaxed flex gap-2">
                <span className="text-indigo-400 shrink-0">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mb-3 rounded-lg border p-3 ${sectionThemes.purple.panel}`}>
          <p
            className={`text-xs font-semibold mb-2 uppercase tracking-wide ${sectionThemes.purple.accent}`}>
            Long
          </p>
          <ul className="space-y-1.5">
            {result.questions.long.map((t, i) => (
              <li
                key={i}
                className="text-xs text-gray-400 leading-relaxed flex gap-2">
                <span className="text-purple-400 shrink-0">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {result.questions.diagram && (
          <div className={`rounded-lg border p-3 ${sectionThemes.pink.panel}`}>
            <p
              className={`text-xs font-semibold mb-2 uppercase tracking-wide ${sectionThemes.pink.accent}`}>
              Diagram
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              {result.questions.diagram}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
