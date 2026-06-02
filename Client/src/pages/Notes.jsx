/** @format */

import React, { useState } from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import TopicForm from "../components/TopicForm";
import FinalResult from "../components/FinalResult";
import Sidebar from "../components/Sidebar.jsx";

const Notes = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="min-h-screen text-gray-400">
      <Navbar />

      {/* CONTENT (important spacing) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-32 text-center text-white">
        <TopicForm
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          setResult={setResult}
        />
      </motion.div>

      {loading && <motion.div
      animate={{opacity:[0.4,1,0.4]}}
      transition={{repeat:Infinity, duration:1.2}}>
        Generating exam focused notes.....
        </motion.div>}

        {error && (
          <div className="mb-6 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

      {/* RESULT SECTION */}
      {!result && <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: result ? 1 : 0.5, y: result ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-5 text-center text-white">
        <p>{result ?  JSON.stringify(result, null, 2) : "Generated Notes will appear here"}</p>
      </motion.div>}

      {/* Generated Content here on this page */}
      {result && (
        <motion.div
          className="flex flex-col lg:grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <div className="lg:col-span-1">
            <Sidebar result={result} />
          </div>
          <div className="lg:col-span-3">
            <FinalResult result={result} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Notes;
