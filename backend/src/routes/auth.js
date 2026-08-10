import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router=express.Router();

router.post('/register',register);
router.post('/login',login);

router.get('/me',authMiddleware,(req,res)=>{
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    })
});
