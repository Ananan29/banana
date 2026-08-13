

import User from "../models/users.js";
import generateToken from "../utils/generateToken.js";

const register=async(req,res,next)=>{
    try{
        const{name,email,password}=req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Email already registered' });
        }
    
        const user = await User.create({ name, email, password });

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
    }

    catch (error)
        {next(error);}

};

const login=async(req,res,next)=>{
    try {const{email,password}=req.body;
    
    if(!email||!password)
    {return res.status(400).json({message:"invalid data sent"});}

    const user=await User.findOne({email}).select('+password');

    if(!user || !(await user.matchPassword(password)))
    {return res.status(401).json({ message: 'Invalid email or password' });}

    res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } 
    catch (error) {
    next(error);
      }
};

export { register, login };