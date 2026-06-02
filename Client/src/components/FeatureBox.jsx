/** @format */

import { motion } from "motion/react";

const FeatureBox = ({ icon: Icon, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-start gap-2 
w-full aspect-square p-4
rounded-xl border border-white/10 bg-white/5 backdrop-blur-md
shadow-[0_10px_25px_rgba(0,0,0,0.4)]
hover:scale-[1.03] transition-all duration-200">
      {/* Icon */}
      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <Icon className="text-white text-sm" />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm text-white font-medium">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </motion.div>
  );
};

export default FeatureBox;
