/** @format */

export const priorityStyles = {
  "⭐⭐⭐": {
    label: "High Priority",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    card: "border-l-amber-400 bg-amber-500/5",
    dot: "text-amber-400",
  },
  "⭐⭐": {
    label: "Medium Priority",
    badge: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    card: "border-l-orange-400 bg-orange-500/5",
    dot: "text-orange-400",
  },
  "⭐": {
    label: "Low Priority",
    badge: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    card: "border-l-sky-400 bg-sky-500/5",
    dot: "text-sky-400",
  },
};

export const sectionThemes = {
  indigo: {
    header: "from-indigo-500/25 to-violet-500/10 border-indigo-400/25 text-indigo-200",
    panel: "bg-indigo-500/5 border-indigo-400/20",
    accent: "text-indigo-300",
  },
  yellow: {
    header: "from-amber-500/25 to-yellow-500/10 border-amber-400/25 text-amber-200",
    panel: "bg-amber-500/5 border-amber-400/20",
    accent: "text-amber-300",
  },
  green: {
    header: "from-emerald-500/25 to-green-500/10 border-emerald-400/25 text-emerald-200",
    panel: "bg-emerald-500/5 border-emerald-400/20",
    accent: "text-emerald-300",
  },
  cyan: {
    header: "from-cyan-500/25 to-teal-500/10 border-cyan-400/25 text-cyan-200",
    panel: "bg-cyan-500/5 border-cyan-400/20",
    accent: "text-cyan-300",
  },
  rose: {
    header: "from-rose-500/25 to-pink-500/10 border-rose-400/25 text-rose-200",
    panel: "bg-rose-500/5 border-rose-400/20",
    accent: "text-rose-300",
  },
  purple: {
    header: "from-purple-500/25 to-fuchsia-500/10 border-purple-400/25 text-purple-200",
    panel: "bg-purple-500/5 border-purple-400/20",
    accent: "text-purple-300",
  },
  pink: {
    header: "from-pink-500/25 to-rose-500/10 border-pink-400/25 text-pink-200",
    panel: "bg-pink-500/5 border-pink-400/20",
    accent: "text-pink-300",
  },
};

export const getPriorityStyle = (starKey) =>
  priorityStyles[starKey] || {
    label: `${starKey} Priority`,
    badge: "bg-white/10 text-gray-300 border-white/20",
    card: "border-l-gray-400 bg-white/5",
    dot: "text-gray-400",
  };
