/** @format */

import { sectionThemes } from "./noteTheme";

const SectionHeader = ({ icon, title, color = "indigo" }) => {
  const theme = sectionThemes[color] || sectionThemes.indigo;

  return (
    <div
      className={`mb-4 px-4 py-2.5 rounded-xl border bg-gradient-to-r font-semibold flex items-center gap-2 ${theme.header}`}>
      <span className="text-lg">{icon}</span>
      <span>{title}</span>
    </div>
  );
};

export default SectionHeader;
