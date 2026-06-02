/** @format */

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Target,
  Rocket,
  Heart,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const vibes = [
  {
    icon: Zap,
    title: "No fluff. Only marks.",
    text: "We cut the noise and give you what actually shows up in exams.",
    color: "text-yellow-400",
  },
  {
    icon: Target,
    title: "Built for students",
    text: "CBSE, boards, competitive — whatever you're chasing, we speak that language.",
    color: "text-blue-400",
  },
  {
    icon: Rocket,
    title: "Speed is the flex",
    text: "Hours of note-making? Done in seconds. Go revise, not rewrite.",
    color: "text-purple-400",
  },
  {
    icon: Heart,
    title: "Chill prep, real results",
    text: "Study smart without burning out. That's the whole vibe.",
    color: "text-pink-400",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-gray-400 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full
          bg-purple-600/20 blur-[120px] pointer-events-none"
        />
        <div
          className="absolute top-40 right-10 w-[300px] h-[300px] rounded-full
          bg-blue-500/15 blur-[100px] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-white/5 border border-white/10 text-sm text-purple-300 mb-6">
            <Sparkles size={16} />
            About Exam.io
          </motion.span>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            We don&apos;t do boring notes.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              We do exam domination.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Exam.io is your AI study partner — bold, fast, and zero drama. Generate
            structured, exam-ready notes and walk into the hall like you already
            know the paper.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold
              hover:opacity-90 shadow-lg shadow-purple-500/25 transition">
              Start generating
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="px-8 py-3.5 rounded-xl border border-white/15 bg-white/5
              text-white font-medium hover:bg-white/10 transition">
              See pricing
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Story block */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why we built this?
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Every student has been there — midnight, messy notebooks, panic
                before boards. We got tired of watching brilliant minds waste time
                on formatting instead of learning.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                So we built Exam.io: type a topic, get clean subtopics, revision
                points, important questions, diagrams — the whole package. No
                corporate lecture. Just tools that work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "10s", l: "Per credit use" },
                { n: "AI", l: "Powered notes" },
                { n: "PDF", l: "Export ready" },
                { n: "24/7", l: "Your schedule" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.l}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl bg-black/40 border border-white/10 p-5 text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.n}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                    {stat.l}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vibes grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white text-center mb-12">
          The Exam.io attitude
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vibes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6
              hover:border-purple-400/30 hover:bg-white/[0.07] transition">
              <item.icon size={28} className={item.color} />
              <h3 className="text-lg font-semibold text-white mt-4">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission punchline */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-purple-500/30
          bg-gradient-to-r from-blue-600/20 via-purple-600/25 to-pink-600/20 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTIuMjIgMTguMjJjLS45OS45OS0uOTkgMi42IDAgMy42bDE4LjE4IDE4LjE4Yy45OS45OSAyLjYuOTkgMy42IDBsMTguMTgtMTguMThjLjk5LS45OS45OS0yLjYgMC0zLjZsLTE4LjE4LTE4LjE4Yy0uOTktLjk5LTIuNi0uOTktMy42IDBsLTE4LjE4IDE4LjE4eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-50" />
          <BookOpen className="w-12 h-12 text-purple-300 mx-auto mb-6 relative" />
          <h2 className="text-3xl md:text-4xl font-black text-white relative">
            Mission? Simple.
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto relative">
            Help every student prep like a topper — without the toxic grind.
          </p>
          <p className="mt-6 text-gray-500 text-sm relative">
            Exam.io — Smarter prep. Better results. Zero attitude (from us, not you).
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
