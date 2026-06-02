/** @format */

import { motion } from "motion/react";
import Navbar from "../Navbar";

/** Same full navbar on every page (History, Pricing, Payments, etc.) */
export const HistoryNavbar = () => <Navbar />;

export const HistoryPageHeader = () => (
  <div className="mb-8 hidden lg:block">
    <h2 className="text-3xl font-bold text-white">History</h2>
    <p className="text-gray-400 mt-1">All your previously generated notes</p>
  </div>
);

export const HistoryLoading = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-400">Loading your notes...</p>
  </div>
);

export const HistoryError = ({ message }) => (
  <div className="text-center py-16 text-red-400 font-medium">{message}</div>
);
