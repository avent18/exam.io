/** @format */

export const gemini_api =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const gemini_response = async (prompt) => {
  try {
    const response = await fetch(
      `${gemini_api}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: String(prompt),
                },
              ],
            },
          ],
        }),
      },
    );
    if (!response.ok) {
      const err = await response.text();
      console.error("GEMINI ERROR:", err);
      throw new Error(err);
    }

    const data = await response.json();

const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

if (!text) {
  throw new Error("No text found in response");
}

// ✅ JSON parse here
let parsed;
try {
  // 🔥 remove ```json and ```
const cleanedText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let parsed;
try {
  parsed = JSON.parse(cleanedText);
} catch (e) {
  console.log("RAW TEXT:", cleanedText);
  throw new Error("Invalid JSON from Gemini");
}

return parsed;
} catch (e) {
  console.log("RAW TEXT:", text); // 🔥 debug
  throw new Error("Invalid JSON from Gemini");
}

return parsed; // ✅ return object
  } catch (error) {
    console.error("FULL ERROR:", error);
    throw error; // 🔥 original error forward karo
  }
};
