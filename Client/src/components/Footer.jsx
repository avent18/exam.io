import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-32 border-t border-white/10 backdrop-blur-md"
    >
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-10">
        
        {/* LEFT */}
        <div>
           <h1
            className="text-xl md:text-2xl font-bold 
          bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
          bg-clip-text text-transparent">
            Exam.io
          </h1>
          <p className="text-gray-400 mt-3 max-w-sm">
            Generate exam-ready notes instantly. Study smarter, score higher.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Product</h3>
          <button
            type="button"
            className="text-left text-gray-400 hover:text-white transition"
            onClick={() => navigate("/pricing")}>
            Pricing
          </button>
          <button
            type="button"
            className="text-left text-gray-400 hover:text-white transition"
            onClick={() => navigate("/about")}>
            About
          </button>
          <button
            type="button"
            className="text-left text-gray-400 hover:text-white transition"
            onClick={() => navigate("/notes")}>
            Generate Notes
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Connect</h3>
          <div className="flex gap-4 text-xl">
            <FaGithub className="hover:text-white cursor-pointer transition" />
            <FaLinkedin className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} ExamAI. All rights reserved.
      </div>

    </motion.footer>
  );
};

export default Footer;