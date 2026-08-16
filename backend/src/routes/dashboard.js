import express from 'express';
import authMiddleware from '../middleware/auth.js'
import {dashboard,dashboardPersonalized,dashboardHero} from '../controllers/dashboard.js'

const router=express.Router();

router.get("/",dashboard);
router.get("/personalized",authMiddleware,dashboardPersonalized);
router.get("/hero",dashboardHero);

export default router;





