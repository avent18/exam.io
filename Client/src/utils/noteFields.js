/** @format */

/** number, string, etc. → safe display text */
export const toDisplayText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") {
    return Number.isNaN(value) ? "" : String(value);
  }
  if (typeof value === "string") return value.trim();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value).trim();
};

export const hasNoteField = (value) => toDisplayText(value).length > 0;

export const getNoteClassLevel = (note) =>
  toDisplayText(
    note?.classLevel ?? note?.content?.classLevel ?? note?.content?.class,
  );

export const getNoteExamType = (note) =>
  toDisplayText(
    note?.examType ?? note?.content?.examType ?? note?.content?.exam,
  );
