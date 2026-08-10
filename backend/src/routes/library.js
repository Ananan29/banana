import express from 'express';
import authMiddleware from '../middleware/auth.js';
import currentlyReading from '../controllers/library.js';



const router=express.Router();

router.get('/Currently-Reading',authMiddleware,currentlyReading);


// router.get('/currentBook',authMiddleware,currentbook);
// router.get('/completedReading',authMiddleware,UserBooks);
// router.get('/ownedBooks',authMiddleware,UserBooks);
// router.get('/',authMiddleware,libraryPage);

export default router;

