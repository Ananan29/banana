import mongoose from 'mongoose';
import Book from "../models/book.js";
import Series from "../models/series.js";

export const seriesPage= async(req,res,next)=>{
    try{
        const seriesId=req.params.seriesId;

        if(!mongoose.Types.ObjectId.isValid(seriesId)){
            return res.status(400).json({
                message: "not valid seriesId",
            });
        };

        const [series,books] =await Promise.all([
        Series.findById(seriesId),
        Book.find({seriesId}).populate("seriesId").populate("authorId","name").select("title coverImage")
        ]);

        if(!series){
            return res.status(404).json({
                message: "series not found",
            }); 
        }

        const result=books.map((book)=>{
            return {
                bookId:book._id,
                title:book.title,
                series:book.seriesId.title,
                author:book.authorId.name,
                coverImage:book.coverImage,
            };
        });

        return res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
};