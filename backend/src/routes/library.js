import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {UserBooks,libraryPage,readBook} from '../controllers/library.js';


const router=express.Router();



router.use(authMiddleware);

router.get('/myBooks',UserBooks);
router.get('/',libraryPage);
router.get('/readBook',readBook);

// router.get('/currentBook',authMiddleware,currentbook);

export default router;

