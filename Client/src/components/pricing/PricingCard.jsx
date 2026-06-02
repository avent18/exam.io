/** @format */

import { motion } from "motion/react";
import { Check, Sparkles, Zap } from "lucide-react";

const PricingCard = ({ plan, index, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`relative flex flex-col rounded-2xl border backdrop-blur-xl p-6 md:p-7
    bg-gradient-to-br ${plan.accent} ${plan.border}
    ${plan.popular ? "lg:scale-105 lg:-mt-2 lg:mb-2 shadow-[0_0_50px_rgba(168,85,247,0.2)]" : "shadow-lg"}`}>
    {plan.popular && (
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5
        px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        text-xs font-bold text-white shadow-lg">
        <Sparkles size={14} />
        {plan.badge}
      </div>
    )}

    <div className="mb-6">
      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
      <p className="text-sm text-gray-400 mt-1">{plan.tagline}</p>
    </div>

    <div className="mb-6">
      <div className="flex items-end gap-1">
        <span className="text-4xl md:text-5xl font-bold text-white">₹{plan.price}</span>
        <span className="text-gray-500 mb-2 text-sm">/one-time</span>
      </div>
      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">
        <Zap size={14} className="text-yellow-400" />
        <span className="text-sm text-gray-200">{plan.credits} credits</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        ~{plan.notesCount} note generations (10 credits each)
      </p>
    </div>

    <ul className="space-y-3 mb-8 flex-1">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-300">
          <Check
            size={16}
            className={`shrink-0 mt-0.5 ${plan.popular ? "text-purple-400" : "text-emerald-400"}`}
          />
          {feature}
        </li>
      ))}
    </ul>

    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={`w-full py-3 rounded-xl font-semibold text-sm transition ${plan.button}`}>
      {plan.popular ? "Get Most Trending" : `Choose ${plan.name}`}
    </button>
  </motion.div>
);

export default PricingCard;
