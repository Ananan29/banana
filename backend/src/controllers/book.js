import {
    getTopRated,
    getRecentlyAdded,
    getExcludedIds,
    getRecentlyPublished,
    getRecommendedBooks
} from "../utils/functions.js";

import OwnedBook from '../models/ownedBook.js';
import FavouriteBook from '../models/favourite.js';
import Book from '../models/book.js';
import mongoose from "mongoose";


export const recentlyPublished = async (req, res, next) => {
    try{
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);


        if (!Number.isInteger(limit) || !Number.isInteger(start) ||limit <= 0 ||start < 0 ) {
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
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);

        if (!Number.isInteger(limit) || !Number.isInteger(start) ||limit <= 0 ||start < 0 ) {
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
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);

        if (!Number.isInteger(limit) || !Number.isInteger(start) ||limit <= 0 ||start < 0 ) {
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

export const recommendedBooks=async (req, res, next) => {
    try{
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);
        const userId=req.user.userId;

        if (!Number.isInteger(limit) || !Number.isInteger(start) ||limit <= 0 ||start < 0 ) {
            return res.status(400).json({
                message: "limit and start must be valid numbers"
            });
        };

        const excludedIds=await getExcludedIds(userId);

        const {recommendedBooks,topGenres}=await getRecommendedBooks(limit,start,excludedIds,userId);
        return res.status(200).json({
            title:"Recommended-Books",
            books:recommendedBooks,
        });

    }
    catch(error){
        next(error);
    }
};


export const bookPage= async(req,res,next)=>{
    try{
        const bookId = req.params.bookId;
        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({
                message: "not valid bookid",
            });
        };

        const result=await Book.findById(bookId).populate("authorId","name").populate("seriesId","title").select("-popularityScore");
        if(!result){
            return res.status(404).json({
                message: "book doesn't exist",
            });
        }
        const {_id,seriesId,authorId,...rest}=result.toObject();

        const bookPayload = {
            bookId: _id,
            authorId: authorId?._id ?? null,
            author: authorId?.name ?? null,
            seriesId: seriesId?._id ?? null,
            series: seriesId?.title ?? null,
            ...rest,
        };

        if(!req.user){
            return res.status(200).json(bookPayload);
        }

        else{
            const Owned=await OwnedBook.findOne({userId:req.user.userId,bookId});
            const Favourite=await FavouriteBook.findOne({userId:req.user.userId,bookId});
            const isOwned=Boolean(Owned);
            const isFavourite=Boolean(Favourite);

            return res.status(200).json({
                ...bookPayload,
                isOwned,
                isFavourite,
            });

        }
        
    }
    catch(error){
        next(error);
    }
};


