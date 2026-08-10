import {
    getTopRated,
    getRecentlyAdded,
    getExcludedIds,
    getRecentlyPublished
} from "../utils/functions.js";

import OwnedBook from '../models/ownedBook.js';
import FavouriteBook from '../models/favourite.js';
import Book from '../models/book.js';
import mongoose from "mongoose";


export const recentlyPublished = async (req, res, next) => {
    try{
        const limit = req.query.limit?.trim() ? Number(req.query.limit) : NaN;
        const start = req.query.start?.trim() ? Number(req.query.start) : NaN;


        if (Number.isNaN(limit) || Number.isNaN(start)) {
            return res.status(400).json({
                message: "limit and start must be valid numbers"
            });
        };

        const excludedIds=await getExcludedIds(req.user?.userId);

        const result=await getRecentlyPublished(limit,start,excludedIds);
        return res.status(200).json({
            title:"New-Releases",
            books:result,
        });

    }
    catch(error){
        next(error);
    }
};

export const recentlyAdded = async (req, res, next) => {
    try{
        const limit = req.query.limit?.trim() ? Number(req.query.limit) : NaN;
        const start = req.query.start?.trim() ? Number(req.query.start) : NaN;

        if (Number.isNaN(limit) || Number.isNaN(start)) {
            return res.status(400).json({
                message: "limit and start must be valid numbers"
            });
        };

        const excludedIds=await getExcludedIds(req.user?.userId);
        
        const result=await getRecentlyAdded(limit,start,excludedIds);
        return res.status(200).json({
            title:"Recently-Added",
            books:result,
        });

    }
    catch(error){
        next(error);
    }
};


export const topRated = async (req, res, next) => {
    try{
        const limit = req.query.limit?.trim() ? Number(req.query.limit) : NaN;
        const start = req.query.start?.trim() ? Number(req.query.start) : NaN;

        if (Number.isNaN(limit) || Number.isNaN(start)) {
            return res.status(400).json({
                message: "limit and start must be valid numbers"
            });
        };

        const excludedIds=await getExcludedIds(req.user?.userId);

        const result=await getTopRated(limit,start,excludedIds);
        return res.status(200).json({
            title:"Top-Rated",
            books:result
        });

    }
    catch(error){
        next(error);
    }
};


export const bookPage= async(req,res,next)=>{
    try{
        const bookId=req.params.bookId;
        if(!bookId?.trim()){
            return res.status(400).json({
                message: "not valid bookid",
            });
        };

        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                message:"Invalid ID"
            });
        };

        const result=await Book.findById(bookId).populate("authorId","name").populate("seriesId","title").select("-popularityScore");
        if(!result){
            return res.status(404).json({
                message: "book doesn't exist",
            });
        }
        const {_id,...rest}=result.toObject();

        if(!req.user){
            return res.status(200).json({
                bookId:_id,
                ...rest,
            });
        }

        else{
            const Owned=await OwnedBook.findOne({userId:req.user.userId,bookId});
            const Favourite=await FavouriteBook.findOne({userId:req.user.userId,bookId});
            const isOwned=Boolean(Owned);
            const isFavourite=Boolean(Favourite);

            return res.status(200).json({
                bookId:_id,
                ...rest,
                isOwned,
                isFavourite,

            });

        }
        
    }
    catch(error){
        next(error);
    }
};


