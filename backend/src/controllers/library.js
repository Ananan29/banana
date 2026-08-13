import Book from "../models/book.js";
import OwnedBook from '../models/ownedBook.js';
import {getUserBooks} from "../utils/functions.js";
import mongoose from "mongoose";
import Chapter from "../models/chapter.js";

export const UserBooks=async(req,res,next)=>{
    try{
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);
        const userId=req.user.userId;
        const status=req.query.status?.trim().toLowerCase();

        if (!Number.isInteger(limit) ||!Number.isInteger(start) ||limit <= 0 ||start < 0 ||!["owned", "reading", "completed"].includes(status)){
            return res.status(400).json({
                message: "Invalid Query"
            });
        }

        const result=await getUserBooks(limit,start,userId,status);

        return res.status(200).json({
            title:status,
            books:result,
        });
    }
    catch(error){
        next(error);
    }

};

export const libraryPage=async(req,res,next)=>{
    try{    
        const userId=req.user.userId;

        const result  =await Promise.all([
            getUserBooks(1,0,userId,"reading"),
            getUserBooks(10,0,userId,"owned"),
        ]);

        return res.status(200).json([
            {title:"Continue-Reading",
            books:result[0][0]},

            {title:"owned",
            books:result[1]},
        ]);
    }
    catch(error){
        next(error);
    }
};


export const readBook=async(req,res,next)=>{
    try{
        const userId=req.user.userId;
        const bookId=req.query.bookId;
        const order= req.query.order !== undefined? Number(req.query.order): undefined;

        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                message: "not valid bookid",
            });
        };

        const book=await OwnedBook.findOne({userId,bookId}).select("readingOrder status");

        if(!book){
            return res.status(400).json({
            message:"couldnt find book"
            })
        }
        if(order!==undefined){
            if(order<1||order>book.readingOrder.totalOrder || !Number.isInteger(order)){
                return res.status(400).json({
                    message:"invalid order"
                });
            }
            
            if(order===book.readingOrder.totalOrder)
                {book.status="completed";}

            else
                {book.status="reading";}

            const result=await Chapter.findOne({bookId,order}).select("order chapterNo title content -_id").lean();

            if (!result) {
                return res.status(404).json({
                    message: "Chapter not found"
                });
            }

            book.readingOrder.currentOrder=order;
            await book.save();

            return res.status(200).json({
                ...result,
                status:book.status,

            });
        }
                
        else{
            if(book.status==="completed")
                {book.readingOrder.currentOrder=1;book.status="reading";await book.save();}

            const result=await Chapter.findOne({bookId, order:book.readingOrder.currentOrder}).select("order chapterNo title content -_id").lean();

            if (!result) {
                return res.status(404).json({
                    message: "Chapter not found"
                });
            }
               
            return res.status(200).json({
                ...result,
                totalOrder:book.readingOrder.totalOrder,
                status:book.status,
            });
        }
    }
    catch(error){
        next(error);
    }
};


