import express, { Router } from 'express';
import { googleAuth, logout } from '../controllers/authController.js';



const authRouter = express.Router();


authRouter.post("/googleAuth", googleAuth)
authRouter.get("/logout", logout)

export default authRouter;