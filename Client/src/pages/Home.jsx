/** @format */

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import hero from "../assets/heroimage.png";
import FeatureBox from "../components/FeatureBox";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaDownload,
  FaMagic,
  FaClock,
  FaLayerGroup,
  FaBrain,
  FaBolt,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFeatures) {
      const t = setTimeout(() => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <div className="min-h-screen overflow-hidden text-gray-400">
        <Navbar />

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              whileHover={{ rotateX: 6, rotateY: -6 }}
              className="transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
                Stop wasting hours
                <br />
                <span className="text-blue-400">making notes.</span>
              </motion.h1>

              <motion.p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
                Get clean, structured, exam-focused material instantly — so you
                can focus on what actually matters: scoring marks.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 px-8 py-3 rounded-xl flex items-center gap-3 
                border border-white/20 backdrop-blur-md text-white 
                hover:bg-white/10 transition-all duration-200 font-medium shadow-lg"
                onClick={()=>navigate("/notes")}
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{
              y: -10,
              rotateX: 6,
              rotateY: -6,
              scale: 1.03,
            }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
              <img
                src={hero}
                alt="hero"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className="mt-24 max-w-7xl mx-auto px-6 md:px-10"
        >
          {/* Heading */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Features
            </h1>
            <p className="text-gray-400 mt-3">
              Everything you need to study smarter, not harder
            </p>
          </div>

          {/* Features Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full sm:w-[45%] lg:w-[30%]">
              <FeatureBox
                icon={FaMagic}
                title="AI Generated Notes"
                subtitle="Turn any topic into structured, exam-ready notes instantly."
              />
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%]">
              <FeatureBox
                icon={FaClock}
                title="Save Hours"
                subtitle="What takes hours manually is done in seconds."
              />
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%]">
              <FeatureBox
                icon={FaLayerGroup}
                title="Structured Content"
                subtitle="Clean headings, bullet points, and easy-to-revise format."
              />
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%]">
              <FeatureBox
                icon={FaDownload}
                title="Export PDFs"
                subtitle="Download neat, printable PDFs in one click."
              />
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%]">
              <FeatureBox
                icon={FaBrain}
                title="Smart Summaries"
                subtitle="Understand faster with concise, high-quality summaries."
              />
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%]">
              <FeatureBox
                icon={FaBolt}
                title="Instant Results"
                subtitle="Lightning-fast generation powered by AI."
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default Home;