/** @format */

import React, { useState } from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { ServerUrl } from "../App";
import { FaGift } from "react-icons/fa";
import FeatureBox from "../components/FeatureBox";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  FaFileAlt,
  FaChartBar,
  FaBrain,
  FaDownload,
  FaLightbulb,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { getCurrentUser } from "../services/api";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const response = await signInWithPopup(auth, provider);

      const name = response.user.displayName;
      const email = response.user.email;

      const result = await axios.post(
        `${ServerUrl}/api/auth/googleAuth`,
        { name, email },
        { withCredentials: true },
      );

      // API returns user object — store that, not the whole Redux slice
      dispatch(setUserData(result.data));
      await getCurrentUser(dispatch);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google Auth Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen overflow-hidden text-black px-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-8xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl border rounded-2xl border-white/10 px-6 py-2
      shadow-[0_20px_45px_rgb(0,0,0,0.6)]">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col text-xl md:text-2xl font-bold tracking-wide 
  bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
  bg-clip-text text-transparent drop-shadow-lg">
          Exam.io
          <span className="text-sm md:text-base font-normal text-gray-300 mt-1 tracking-wide font-['Caveat']">
            Smarter prep. Better results.
          </span>
        </motion.h1>
      </motion.header>
      {/* main */}
      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}>
          <h1
            className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight
bg-gradient-to-br from-white via-gray-200 to-gray-500 
bg-clip-text text-transparent">
            Unlock <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The power of AI
            </span>
          </h1>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleGoogleAuth}
            disabled={loading}
            className="mt-10 px-10 py-3 rounded-2xl flex items-center gap-3 
  border border-white/20 bg-black text-white 
  hover:bg-white/10 transition-all duration-200 font-['Short_Stack']
  disabled:opacity-50 disabled:cursor-not-allowed">
            <FcGoogle size={25} />
            {loading ? "Signing in..." : "Continue with Google"}
          </motion.button>
          <p className="mt-8 text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
            Get{" "}
            <span className="text-white font-semibold">50 free credits</span> to
            instantly create
            <span className="text-blue-400 font-medium"> exam notes</span>,
            <span className="text-purple-400 font-medium">
              {" "}
              project summaries
            </span>
            ,<span className="text-pink-400 font-medium"> charts & graphs</span>
            , and download clean PDFs —
            <span className="text-white font-medium">all powered by AI</span>.
          </p>
          <p className="mt-2 text-xs md:text-base text-gray-400 max-w-md tracking-wide">
            <span className="text-white font-medium">-Unlock more credits</span>{" "}
            anytime and keep creating without limits.
          </p>
        </motion.div>
        {/* RIGHT CONTENT */}
        <div className="mt-8 flex flex-col gap-4">
          {/* Feature Boxes */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <CreditBox />

            <FeatureBox
              icon={FaFileAlt}
              title="Exam Notes"
              subtitle="Generate exam-ready notes instantly with AI"
            />
            <FeatureBox
              icon={FaLightbulb}
              title="Project Summaries"
              subtitle="Create structured and clear project notes"
            />
            <FeatureBox
              icon={FaDownload}
              title="Export PDFs"
              subtitle="Download clean PDFs in one click"
            />
            <FeatureBox
              icon={FaChartBar}
              title="Charts & Graphs"
              subtitle="Visualize concepts with smart visuals"
            />
            <FeatureBox
              icon={FaBrain}
              title="Smart Learning"
              subtitle="Simplify complex topics effortlessly"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const CreditBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col justify-center items-start gap-2 
w-full aspect-square p-4
rounded-xl border border-white/10 bg-white/5 backdrop-blur-md
shadow-[0_10px_25px_rgba(0,0,0,0.4)]
hover:scale-[1.03] transition-all duration-200">
      {/* Icon */}
      <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        <FaGift className="text-white text-sm" />
      </div>

      {/* Text content */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-300 tracking-wide">
          <span className="text-white font-semibold">50 Free Credits</span>{" "}
          Giveaway
        </p>

        <p className="text-xs text-gray-500 mt-0.5">
          Start creating smarter notes instantly with AI.
        </p>
      </div>
    </motion.div>
  );
};

export default Auth;
