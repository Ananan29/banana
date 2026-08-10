import express from 'express';
import authMiddleware from '../middleware/auth.js';



const router =express.Router();

router.get('/series',bookseries);

export default router;

