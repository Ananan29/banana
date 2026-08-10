import mongoose from "mongoose";

const favouriteSchema=new mongoose.Schema(
    {   userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true},

        bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required: true,}

    },
    {timestamps:true,},);

const FavouriteBook=mongoose.model('FavouriteBook',favouriteSchema);

export default FavouriteBook;