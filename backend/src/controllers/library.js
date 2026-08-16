import Book from "../models/book.js";
import OwnedBook from '../models/ownedBook.js';
import {getUserBooks, getBookReadingLength, listReadingOrder} from "../utils/functions.js";
import mongoose from "mongoose";
import Chapter from "../models/chapter.js";

const LIBRARY_PAGE_SIZE = 12;
const LIBRARY_STATUSES = ["all", "owned", "reading", "completed"];

export const UserBooks=async(req,res,next)=>{
    try{
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);
        const userId=req.user.userId;
        const status=(req.query.status?.trim().toLowerCase() || "all");

        if (!Number.isInteger(limit) ||!Number.isInteger(start) ||limit <= 0 ||start < 0 ||!LIBRARY_STATUSES.includes(status)){
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

        const [reading, owned, completed, all] = await Promise.all([
            getUserBooks(LIBRARY_PAGE_SIZE,0,userId,"reading"),
            getUserBooks(LIBRARY_PAGE_SIZE,0,userId,"owned"),
            getUserBooks(LIBRARY_PAGE_SIZE,0,userId,"completed"),
            getUserBooks(LIBRARY_PAGE_SIZE,0,userId,"all"),
        ]);

        return res.status(200).json([
            {title:"Continue-Reading",
            books:reading},
            {title:"all",
            books:all},
            {title:"owned",
            books:owned},
            {title:"reading",
            books:reading},
            {title:"completed",
            books:completed},
        ]);
    }
    catch(error){
        next(error);
    }
};


export const listChapters=async(req,res,next)=>{
    try{
        const bookId=req.query.bookId;
        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                message: "not valid bookid",
            });
        }

        const chapters = await listReadingOrder(bookId);
        return res.status(200).json({
            chapters,
            totalOrder: chapters.length,
        });
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

        const totalOrder = await getBookReadingLength(bookId);
        if (book.readingOrder.totalOrder !== totalOrder) {
            book.readingOrder.totalOrder = totalOrder;
            if (book.readingOrder.currentOrder > totalOrder) {
                book.readingOrder.currentOrder = totalOrder;
            }
        }

        if(order!==undefined){
            if(order<1||order>totalOrder || !Number.isInteger(order)){
                return res.status(400).json({
                    message:"invalid order"
                });
            }
            
            if(order===totalOrder)
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
                totalOrder,
            });
        }
                
        else{
            if(book.status==="completed")
                {book.readingOrder.currentOrder=1;book.status="reading";}

            const currentOrder = Math.max(1, book.readingOrder.currentOrder || 1);
            const result=await Chapter.findOne({bookId, order: currentOrder}).select("order chapterNo title content -_id").lean();

            if (!result) {
                return res.status(404).json({
                    message: "Chapter not found"
                });
            }

            await book.save();
               
            return res.status(200).json({
                ...result,
                totalOrder,
                status:book.status,
            });
        }
    }
    catch(error){
        next(error);
    }
};


