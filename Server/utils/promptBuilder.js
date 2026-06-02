export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart
}) => {
  return `
Generate exam-focused study notes for the topic "${topic}".

Details:
- Class: ${classLevel || "General"}
- Exam: ${examType || "General"}
- Mode: ${revisionMode ? "Revision (short points)" : "Detailed"}

Instructions:
- Output MUST be valid JSON
- Do NOT include any JavaScript code or template strings like \${}
- Use simple, clean language
- Follow the structure strictly

JSON format:
{
  "subTopics": {
    "⭐": ["", "", ""],
    "⭐⭐": ["", "", ""],
    "⭐⭐⭐": ["", "", ""]
  },
  "importance": "",
  "notes": "",
  "revisionPoints": ["", "", ""],
  "questions": {
    "short": ["", ""],
    "long": ["", ""],
    "diagram": ""
  },
  "diagram": {
    "type": "${includeDiagram ? "flowchart" : "none"}",
    "data": "${includeDiagram ? "graph TD\\nA[Start] --> B[Process]" : ""}"
  },
  "charts": ${includeChart ? `[{
    "type": "bar | line | pie",
    "title": "string",
    "data": [
      { "name": "Concept1", "value": 80 },
      { "name": "Concept2", "value": 60 }
    ]
  }]` : "[]"}
}

Return ONLY JSON.
`;
};