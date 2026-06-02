/** @format */
import NotesModel from "../models/notesModel.js";
import UserModel from "../models/userModel.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { gemini_response } from "../services/api.gemini.js";

export const generateNotes = async (req, res) => {
  const { prompt } = req.body;
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    } 
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.credits <= 0) {
      return res.status(403).json({ error: "Insufficient credits" });
    }
    const builtPrompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram, 
      includeChart,
    });

    const apiResponse = await gemini_response(builtPrompt);

    const normalizeField = (value) => {
      if (value === null || value === undefined) return undefined;
      const text = typeof value === "number" ? String(value) : String(value).trim();
      return text.length > 0 ? text : undefined;
    };

    const notes = new NotesModel({
      user: req.userId|| user._id,
      topic,
      classLevel: normalizeField(classLevel),
      examType: normalizeField(examType),
      revisionMode,
      includeDiagrams: includeDiagram,
      content: apiResponse,
    });
    user.credits-=10;
    if(user.credits<=0)user.isCreditAvailable=false;
    if(!Array.isArray(user.notes)){
      user.notes = [];
    }
    user.notes.push(notes._id);
    await notes.save(); 
    await user.save();
    return res.status(200).json({
      data:apiResponse,

      notesId:notes._id,
      creditsLeft:user.credits,
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
