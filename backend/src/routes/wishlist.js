import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {createfav,getfav,deletefav} from "../controllers/favourite.js";


const router=express.Router();

router.use(authMiddleware)

router.post("/:bookId",createfav);
router.get("/",getfav);
router.delete("/:bookId",deletefav);

export default router;


