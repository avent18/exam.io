/** @format */

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { SiDiagramsdotnet } from "react-icons/si";
import { IoStatsChartSharp } from "react-icons/io5";
import { Download, Zap, BookOpen } from "lucide-react";
import MermaidSetUp from "./MermaidSetUp";
import Recharts from "./Recharts.jsx";
import { downloadPDF } from "../services/api.js";
import SectionHeader from "./notes/SectionHeader";
import { getPriorityStyle, sectionThemes } from "./notes/noteTheme";
import { markdownComponents } from "./notes/markdownComponents";

const QuestionBlock = ({ title, items, theme, numbered = true }) => (
  <div
    className={`rounded-xl border p-4 mb-4 ${sectionThemes[theme].panel}`}>
    <p
      className={`text-sm font-semibold mb-3 uppercase tracking-wide ${sectionThemes[theme].accent}`}>
      {title}
    </p>
    <ul className={numbered ? "space-y-2.5" : "space-y-2"}>
      {(numbered ? items : [items]).map((q, i) => (
        <li
          key={i}
          className="flex gap-3 text-sm text-gray-300 leading-relaxed">
          {numbered && (
            <span
              className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold bg-white/10 ${sectionThemes[theme].accent}`}>
              {i + 1}
            </span>
          )}
          <span className="pt-0.5">{q}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FinalResult = ({ result }) => {
  const [quickRevision, setQuickRevision] = useState(false);

  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long ||
    !result.revisionPoints
  ) {
    return null;
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto mt-6 p-6 md:p-8 rounded-2xl
      bg-gradient-to-br from-[#12121a] via-[#14141f] to-[#0f0f16]
      border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Generated Notes
            </h2>
            {result.importance && (
              <p className="text-sm text-emerald-400/90 mt-0.5">
                {result.importance}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setQuickRevision(!quickRevision)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition
            ${
              quickRevision
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/25"
            }`}>
            <Zap size={16} />
            {quickRevision ? "Exit Revision" : "Quick Revision"}
          </button>
          <button
            type="button"
            onClick={() => downloadPDF(result)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl
            bg-white/10 text-gray-200 border border-white/10 hover:bg-white/15 transition">
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Priority subtopics */}
      {!quickRevision && (
        <section className="mb-8">
          <SectionHeader icon="⭐" title="Topic Priorities" color="yellow" />
          <div className="space-y-3">
            {Object.entries(result.subTopics).map(([star, topics]) => {
              const style = getPriorityStyle(star);
              return (
                <div
                  key={star}
                  className={`rounded-xl border-l-4 p-4 backdrop-blur-sm border border-white/5 ${style.card}`}>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg border mb-3 ${style.badge}`}>
                    {star} · {style.label}
                  </span>
                  <ul className="space-y-2">
                    {topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-sm text-gray-300 leading-relaxed">
                        <span className={style.dot}>•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Detailed notes markdown */}
      {!quickRevision && (
        <section className="mb-8">
          <SectionHeader icon="📝" title="Detailed Notes" color="indigo" />
          <div
            className={`rounded-xl border p-5 md:p-6 ${sectionThemes.indigo.panel}`}>
            <ReactMarkdown components={markdownComponents}>
              {result.notes}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* Quick revision */}
      {quickRevision && (
        <section
          className={`mb-8 rounded-xl border p-6 ${sectionThemes.green.panel}`}>
          <h3 className="font-bold text-emerald-300 mb-4 text-lg flex items-center gap-2">
            <Zap size={20} />
            Exam Quick Revision (5 min)
          </h3>
          <ul className="space-y-3">
            {result.revisionPoints.map((p, i) => (
              <li
                key={i}
                className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Diagram */}
      {result.diagram?.data && (
        <section className="mb-8">
          <SectionHeader
            icon={<SiDiagramsdotnet />}
            title="Diagram"
            color="cyan"
          />
          <div
            className={`rounded-xl border p-4 ${sectionThemes.cyan.panel}`}>
            <MermaidSetUp diagram={result.diagram?.data} />
            <p className="mt-3 text-xs text-gray-500 italic">
              Save this diagram for future reference by taking a screenshot.
            </p>
          </div>
        </section>
      )}

      {/* Charts */}
      {result.charts?.length > 0 && (
        <section className="mb-8">
          <SectionHeader
            icon={<IoStatsChartSharp />}
            title="Visual Charts"
            color="indigo"
          />
          <div
            className={`rounded-xl border p-4 ${sectionThemes.indigo.panel}`}>
            <Recharts charts={result.charts} />
            <p className="mt-3 text-xs text-gray-500">
              Screenshot recommended for offline reference.
            </p>
          </div>
        </section>
      )}

      {result.charts?.length === 0 && (
        <p className="text-sm text-gray-500 mb-6 italic">
          Relevant charts are not available for this topic.
        </p>
      )}

      {/* Questions */}
      <section>
        <SectionHeader
          icon={<BsFillQuestionSquareFill />}
          title="Important Questions"
          color="rose"
        />
        <QuestionBlock
          title="Short Questions"
          items={result.questions.short}
          theme="indigo"
        />
        <QuestionBlock
          title="Long Questions"
          items={result.questions.long}
          theme="purple"
        />
        {result.questions.diagram && (
          <QuestionBlock
            title="Diagram Questions"
            items={result.questions.diagram}
            theme="pink"
            numbered={false}
          />
        )}
      </section>
    </div>
  );
};

export default FinalResult;
