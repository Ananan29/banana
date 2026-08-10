import express from 'express';
import authMiddleware from '../middleware/auth.js';


const router=express.Router();

router.post("/wishlist/createfav",authMiddleware,createfav);
router.get("/wishlist",authMiddleware,wishlist);
//delete fav 

export default router;


