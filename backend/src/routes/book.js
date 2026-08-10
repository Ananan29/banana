import express from 'express';
import optionalAuthMiddleware from "../middleware/optionalAuth.js";
import {
    bookPage,
    topRated,
    recentlyAdded,
    recentlyPublished
} from "../controllers/book.js";

const router=express.Router();

router.get("/:bookId",optionalAuthMiddleware,bookPage);


router.get('/Top-Rated',optionalAuthMiddleware,topRated);
router.get('/Recently-Added',optionalAuthMiddleware,recentlyAdded);
router.get('/New-Releases',optionalAuthMiddleware,recentlyPublished);

export default router;





