import express from 'express';
import authMiddleware from '../middleware/auth.js';
import genreBooks from '../controllers/genres.js';
import optionalAuthMiddleware from '../middleware/optionalAuth.js';



const router=express.Router();

router.get("/",optionalAuthMiddleware,genreBooks);

export default router;