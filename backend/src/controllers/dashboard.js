import OwnedBook from '../models/ownedBook.js';
import FavouriteBook from '../models/favourite.js';
import Book from '../models/book.js';
import Author from '../models/author.js';
import Series from '../models/series.js';
import {getTopRated,getRecentlyAdded,getExcludedIds,getRecentlyPublished,getGenreBooks,getUserBooks,getRecommendedBooks} from '../utils/functions.js';
import { getRandomGenres } from '../utils/extraFunctions.js';
import mongoose from "mongoose";

const DEFAULT_SHELF_SIZE = 12;

const pagingFromQuery = (req) => {
    const hasLimit = req.query.limit != null && req.query.limit !== "";
    const hasStart = req.query.start != null && req.query.start !== "";
    const limit = hasLimit ? Number(req.query.limit) : DEFAULT_SHELF_SIZE;
    const start = hasStart ? Number(req.query.start) : 0;

    if (!Number.isInteger(limit) || !Number.isInteger(start) || limit <= 0 || start < 0) {
        return { error: "limit and start must be valid numbers" };
    }

    return { limit: Math.min(limit, 40), start };
};

export const dashboard= async(req,res,next)=>{
    try{
        const paging = pagingFromQuery(req);
        if (paging.error) {
            return res.status(400).json({ message: paging.error });
        }
        const { limit, start } = paging;
        const randomGenres = getRandomGenres(5);

        const [topRated, recentlyAdded, recentlyPublished,dashboardGenre] = await Promise.all([
        getTopRated(limit,start,[]),
        getRecentlyAdded(limit,start,[]),
        getRecentlyPublished(limit,start,[]),
    
        Promise.all(
            randomGenres.map(async(genre)=>{
                return {
                    title:genre,
                    books: await getGenreBooks(limit,start,[],genre)
                }
            })
        ),
    
        ]);

        const result =[
            {title: "Top-Rated",
            books: topRated},

            {title: "Recently-Added",
            books: recentlyAdded},

            {title: "New-Releases",
            books: recentlyPublished},

            ...dashboardGenre

        ];

        return res.status(200).json(
            result
        );
    }
    
    catch(error){
        next(error);
    }
    
};

export const dashboardPersonalized=async (req,res,next)=>{
    try{
        const paging = pagingFromQuery(req);
        if (paging.error) {
            return res.status(400).json({ message: paging.error });
        }
        const { limit, start } = paging;
        const excludedIds=await getExcludedIds(req.user.userId);

        const {recommendedBooks,topGenres}=await getRecommendedBooks(limit,start,excludedIds,req.user.userId);                        
 
        const [topRated, recentlyAdded, recentlyPublished,currentlyReading,dashboardGenre] = await Promise.all([
        getTopRated(limit,start,excludedIds),
        getRecentlyAdded(limit,start,excludedIds),
        getRecentlyPublished(limit,start,excludedIds),
        getUserBooks(limit,start,req.user.userId,"reading"),
    
        Promise.all(
            topGenres.map(async (genre)=>{
                return {title:genre,
                        books:await getGenreBooks(limit,start,excludedIds,genre)
                        }
            })
        )
        ]);

        const result =[
            {title: "Reading",
            books: currentlyReading},

            {title: "Top-Rated",
            books: topRated},

            {title: "Recently-Added",
            books: recentlyAdded},

            {title: "New-Releases",
            books: recentlyPublished},

            ...dashboardGenre,

            {title: "Recommended-Books",
            books: recommendedBooks},

        ];
        return res.status(200).json(
            result
        );  
        
    }

    catch(error){
        next(error);
    }
};

export const dashboardHero = async (req, res, next) => {
    try {
        const sampled = await Book.aggregate([
            { $match: { coverImage: { $exists: true, $nin: [null, ""] } } },
            { $sample: { size: 5 } },
        ]);
        const books = await Book.populate(sampled, { path: "authorId", select: "name" });
        const hero = books.map((book) => ({
            bookId: book._id,
            title: book.title,
            author: book.authorId?.name || "",
            coverImage: book.coverImage,
        }));
        res.set("Cache-Control", "no-store");
        return res.status(200).json(hero);
    } catch (error) {
        next(error);
    }
};




