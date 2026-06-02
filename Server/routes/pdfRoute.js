import express from 'express';
import { pdfGenerator } from '../controllers/pdfController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const pdfRouter = express.Router();

pdfRouter.post('/generate-pdf', isAuthenticated, pdfGenerator);

export default pdfRouter;
