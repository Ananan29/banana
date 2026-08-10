import express from 'express';
import authorPage from '../controllers/author.js';

const router=express.Router();

router.get('/:authorId',authorPage);

export default router;
