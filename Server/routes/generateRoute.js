import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { generateNotes } from "../controllers/generateController.js";
import { getMyNotes } from "../controllers/notesController.js";
import { getSingleNote } from "../controllers/notesController.js";

const generateRouter = express.Router();

generateRouter.post("/generateNotes", isAuthenticated, generateNotes);
generateRouter.get("/getNotes", isAuthenticated, getMyNotes);
generateRouter.get("/getNote/:id", isAuthenticated, getSingleNote);

export default generateRouter;