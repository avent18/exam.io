import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config();
import connnectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import generateRouter from './routes/generateRoute.js';
import pdfRouter from './routes/pdfRoute.js';
import creditRouter from './routes/creditRoute.js';
import { stripeWebhook } from './controllers/creditsController.js';

const app = express();

const PORT = process.env.PORT;

app.post("/api/credits/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(cors({
  origin: "https://exam-io-orcin.vercel.app",
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())



app.use('/api/auth/',authRouter)
app.use('/api/user/', userRouter)
app.use('/api/generate/', generateRouter)
app.use('/api/pdf/', pdfRouter)
app.use("/api/credits/", creditRouter)


connnectDB()
.then(()=>{
  app.listen(PORT, ()=>{
  console.log(`Server is listening to ${PORT}`)
})
}).catch((error)=>{
  console.log(`server listening error ${error}`)
})
