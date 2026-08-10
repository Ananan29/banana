import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema= new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            minlength:2,
            maxlength:50,
            
        },

        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique:true,
            match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },

        password:{
            type: String,
            required:true,
            minlength:6,
            maxlength:128,
            select:false,
            match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
    
  
        },

    },
    {timestamps:true}

)

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


const User= mongoose.model('User',userSchema);

export default User; 

