/** @format */

import React from "react";

import { useState, useEffect } from "react";
import { generateNotes } from "../services/api";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");

  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const dispatch = useDispatch()

  // 🔥 reusable toggle function
  const toggle = (setter) => {
    setter((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Topic is required");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      console.log("FULL RESULT:", result);

      // 🔥 SAFE HANDLING
      setResult(result.data);
      setProgress(100);
      setProgressText("Completed ✅");
      dispatch(updateCredits(-10));
      setClassLevel("");
      setExamType("");
      setIncludeChart(false);
      setRevisionMode(false);
      setIncludeChart(false);

      

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setError("Failed to generate notes");
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Getting ready...");
      } else if (value > 40) {
        setProgressText("Processing content...");
      } else {
        setProgressText("Generating notes...");
      }

      setProgress(Math.floor(value));
    }, 300);

    return () => clearInterval(interval); // 🔥 cleanup
  }, [loading]);

  return (
    <div className="min-h-screen flex items-center justify-center   text-white px-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Generate Notes</h2>

        {/* Topic */}
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
        />

        {/* Class */}
        <input
          type="text"
          placeholder="Class (e.g. 10th, 12th)"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
        />

        {/* Exam */}
        <input
          type="text"
          placeholder="Exam Type (CBSE, JEE, etc)"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
        />

        {/* Toggles */}
        <Toggle
          label="Revision Mode"
          value={revisionMode}
          onToggle={() => toggle(setRevisionMode)}
        />

        <Toggle
          label="Include Diagram"
          value={includeDiagram}
          onToggle={() => toggle(setIncludeDiagram)}
        />

        <Toggle
          label="Include Chart"
          value={includeChart}
          onToggle={() => toggle(setIncludeChart)}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className={`w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}>
          {loading ? "Generating..." : "Generate Notes"}
        </button>
        {loading && (
          <div className="mt-4 space-y-2">
            <div className="w-full h-2 rounded-2xl bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
                className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"></motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-300">
              <span>{progressText}</span>
              <span>{progress}%</span>
            </div>
            <span>This process may take upto a minute. Plz do not close or exit the page</span>
          </div>
        )}
      </div>
    </div>
  );
};

{
  /* 🔥 Toggle Switch */
}
const Toggle = ({ label, value, onToggle }) => (
  <div className="flex items-center justify-between mb-4">
    <span>{label}</span>

    <div
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        value ? "bg-blue-500" : "bg-gray-600"
      }`}>
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          value ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  </div>
);

export default TopicForm;
