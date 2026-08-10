import express from 'express';
import authMiddleware from '../middleware/auth.js'
import {dashboard,dashboardPersonalized} from '../controllers/dashboard.js'

const router=express.Router();

// router.get("/search", searchBooks);

router.get("/",dashboard);
router.get("/personalized",authMiddleware,dashboardPersonalized);

export default router;





