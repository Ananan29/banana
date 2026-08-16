
import OwnedBook from '../models/ownedBook.js';
import FavouriteBook from '../models/favourite.js';
import Book from '../models/book.js';
import Author from '../models/author.js';
import Series from '../models/series.js';
import Chapter from '../models/chapter.js';
import { getRandomGenres } from './extraFunctions.js';

export const getExcludedIds=async (userId)=>{
    let excludedIds=[];
    if(userId){
        const [ownedBooks, favouriteBooks]=await Promise.all([
            OwnedBook.find({userId}).select('bookId -_id'),
            FavouriteBook.find({userId}).select('bookId -_id')
        ]);

        excludedIds=[...ownedBooks.map((book)=>book.bookId), ...favouriteBooks.map((book)=>book.bookId)];
    }

    return excludedIds;
};

export const getBookReadingLength = async (bookId) => {
    const count = await Chapter.countDocuments({ bookId });
    if (count > 0) return count;
    const book = await Book.findById(bookId).select("totalChapters");
    return Math.max(book?.totalChapters || 1, 1);
};

export const listReadingOrder = async (bookId) => {
    const chapters = await Chapter.find({ bookId })
        .sort({ order: 1 })
        .select("order title chapterNo -_id")
        .lean();
    return chapters.map((chapter) => ({
        order: chapter.order,
        title: chapter.title,
        chapterNo: chapter.chapterNo,
    }));
};

const toBookCard = (book) => {
    if (!book?.authorId?.name) return [];
    return [{
        bookId: book._id,
        title: book.title,
        author: book.authorId.name,
        coverImage: book.coverImage,
    }];
};

export const getTopRated=async(limit,start,excludedIds=[])=>{
    const books= await Book.find({
        _id:{$nin: excludedIds}
    })
        .sort({ popularityScore: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId","name")
        .select("title authorId coverImage");

    return books.flatMap(toBookCard);
};

export const getRecentlyAdded=async (limit,start,excludedIds=[])=>{
    const books= await Book.find({
        _id:{$nin: excludedIds}
    })
        .sort({ updatedAt: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId","name")
        .select("title authorId coverImage");
    
    return books.flatMap(toBookCard);
};

export const getRecentlyPublished=async (limit,start,excludedIds=[])=>{
    const books= await Book.find({
        _id:{$nin: excludedIds}
    })
        .sort({ publishedAt: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId","name")
        .select("title authorId coverImage");

    return books.flatMap(toBookCard);
};

export const getGenreBooks = async (limit, start, excludedIds=[],genre) => {
    const books = await Book.find({
        genres: genre,
        _id: { $nin: excludedIds }
    })
        .sort({ popularityScore: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId", "name")
        .select("title authorId coverImage");

    return books.flatMap(toBookCard);

};

export const getUserBooks= async (limit,start,userId,status) => {
    const query = { userId };
    if (status && status !== "all") {
        query.status = status;
    }

    const books= await OwnedBook.find(query)
        .sort({ updatedAt: -1 })
        .skip(start)
        .limit(limit)
        .populate({
            path: "bookId",
            select: "title authorId coverImage",
            populate: {
                path: "authorId",
                select:"name",
            }
        });
    
    return books.flatMap((book)=>{
        if (!book.bookId) return [];
        return [{
            bookId: book.bookId._id,
            title:book.bookId.title,
            author:book.bookId.authorId?.name,
            coverImage: book.bookId.coverImage,
            status: book.status,
        }];
    })
};

export const getRecommendedBooks=async(limit,start,excludedIds,userId)=>{
    const [ownedBooks, favouriteBooks] = await Promise.all([
    OwnedBook.find({ userId }).populate("bookId"),
    FavouriteBook.find({ userId }).populate("bookId")]);
        
    const genreWeights={};
    const authorWeights={};
    const seriesWeights={};

    //weights
    for(const book of ownedBooks){
        if (!book.bookId) continue;
        let weight;

        if (book.status === "owned") {
            weight = 5;} 
        else if (book.status === "completed") {
            weight = 10;} 
        else {
            weight = 8;}

            
        for (const genre of book.bookId.genres || []) {
            genreWeights[genre] =(genreWeights[genre] || 0)+ weight;
        }
    
        authorWeights[book.bookId.authorId]=(authorWeights[book.bookId.authorId] || 0)+10+weight;

        if(book.bookId.seriesId){
            seriesWeights[book.bookId.seriesId]=(seriesWeights[book.bookId.seriesId] || 0)+weight+100;
        }
    }

    for(const book of favouriteBooks){
        if (!book.bookId) continue;
        for (const genre of book.bookId.genres || []) {
            genreWeights[genre] =(genreWeights[genre] || 0)+ 3;
        }
    
        authorWeights[book.bookId.authorId]=(authorWeights[book.bookId.authorId] || 0)+10+3;

        if(book.bookId.seriesId){
            seriesWeights[book.bookId.seriesId]=(seriesWeights[book.bookId.seriesId] || 0)+3+100;
        }
    }
        
    //weights on each book
    const books=await Book.find({_id:{$nin: excludedIds}})
                    .populate("authorId", "name")
                    .select("title authorId coverImage genres seriesId");
    const result=[];
       
    for(const book of books){
        if (!book.authorId?._id) continue;
        let totalscore=0;
        for(const genre of book.genres || []){
            totalscore+=genreWeights[genre]||0;
        }

        totalscore+=authorWeights[book.authorId._id]||0;
        if(book.seriesId){
            totalscore+=seriesWeights[book.seriesId]||0;
        }
        
        result.push({
            book:book,
            score:totalscore,});
    }

    result.sort((a, b) => b.score - a.score);
    const recommendedBooks = result.slice(start, start + limit).flatMap((item) => toBookCard(item.book));
    
    const topGenres = Object.keys(genreWeights)
    .sort((a, b) => genreWeights[b] - genreWeights[a])
    .slice(0, 5);

    const randomGenres = getRandomGenres(5-topGenres.length,topGenres);
    topGenres.push(...randomGenres);

    return {recommendedBooks,topGenres};
};



