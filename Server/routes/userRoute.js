import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.get("/getCurrentUser",isAuthenticated, getCurrentUser)


export default userRouter;