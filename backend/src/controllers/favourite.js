import mongoose from "mongoose";
import FavouriteBook from "../models/favourite.js";

export const createfav=async(req,res,next)=>{
    try{
        const bookId=req.params.bookId;
        const userId=req.user.userId;
            
        if(!bookId?.trim() || !mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                message: "not valid bookid",
            });
        };

        const existing = await FavouriteBook.findOne({userId,bookId});

        if (existing) {
            return res.status(409).json({
                message: "Book is already in favourites"
            });
        }

        const favourite = await FavouriteBook.create({userId,bookId});

        return res.status(201).json({
            message: "Book added to favourites",
            favourite
        });  
    }
    catch(error){
        next(error);
    }
};



export const getfav=async(req,res,next)=>{
    try{
        const userId=req.user.userId;

        const books=await FavouriteBook.find({userId})
                .populate({
                    path:"bookId",
                    select:"title authorId coverImage",
                    populate:{
                        path:"authorId",
                        select:"name",
                    }
                });   
    
        const result =books.map(book=>({
            title:book.bookId.title,
            bookId:book.bookId._id,
            author:book.bookId.authorId.name,
            coverImage:book.bookId.coverImage,
        }));

        return res.status(200).json(result); 
    }
    catch(error){
        next(error);
    }  
};


export const deletefav=async(req,res,next)=>{
    try{
        const bookId=req.params.bookId;
        const userId=req.user.userId;
            
        if(!bookId?.trim() || !mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                message: "not valid bookid",
            });
        };

        const result=await FavouriteBook.findOneAndDelete({userId,bookId});

        if (!result) {
            return res.status(404).json({
                message: "Book not found in favourites"
            });
        }

        return res.status(200).json({
            message: "Book removed from favourites",
            deletedBookId: req.params.bookId
        });
    }
    catch(error){
        next(error);
    }
}; 