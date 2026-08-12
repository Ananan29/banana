import express from 'express';
import optionalAuthMiddleware from "../middleware/optionalAuth.js";
import authMiddleware from '../middleware/auth.js';
import {
    bookPage,
    topRated,
    recentlyAdded,
    recentlyPublished,
    recommendedBooks,
} from "../controllers/book.js";

const router=express.Router();

router.get('/Top-Rated',optionalAuthMiddleware,topRated);
router.get('/Recently-Added',optionalAuthMiddleware,recentlyAdded);
router.get('/New-Releases',optionalAuthMiddleware,recentlyPublished);

router.get("/Recommended-Books",authMiddleware,recommendedBooks);
router.get("/:bookId",optionalAuthMiddleware,bookPage);

export default router;





