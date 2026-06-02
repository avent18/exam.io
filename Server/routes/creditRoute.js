import express from "express";


import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createCreditOrder } from "../controllers/creditsController.js";


const creditRouter = express.Router();


creditRouter.post("/order", isAuthenticated, createCreditOrder);

export default creditRouter;