
import OwnedBook from '../models/ownedBook.js';
import FavouriteBook from '../models/favourite.js';
import Book from '../models/book.js';
import Author from '../models/author.js';
import Series from '../models/series.js';
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

export const getTopRated=async(limit,start,excludedIds)=>{
    const books= await Book.find({
        _id:{$nin: excludedIds}
    })
        .sort({ popularityScore: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId","name")
        .select("title authorId coverImage");

    return books.map(book => ({
        bookId: book._id,
        title: book.title,
        author: book.authorId.name,
        coverImage: book.coverImage
    }));
};

export const getRecentlyAdded=async (limit,start,excludedIds)=>{
    const books= await Book.find({
        _id:{$nin: excludedIds}
    })
        .sort({ updatedAt: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId","name")
        .select("title authorId coverImage");
    
    return books.map(book => ({
        bookId: book._id,
        title: book.title,
        author: book.authorId.name,
        coverImage: book.coverImage
    }));
};

export const getRecentlyPublished=async (limit,start,excludedIds)=>{
    const books= await Book.find({
        _id:{$nin: excludedIds}
    })
        .sort({ publishedAt: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId","name")
        .select("title authorId coverImage");

    return books.map(book => ({
        bookId: book._id,
        title: book.title,
        author: book.authorId.name,
        coverImage: book.coverImage
    }));
};

export const getGenreBooks = async (limit, start, excludedIds,genre) => {
    const books = await Book.find({
        genres: genre,
        _id: { $nin: excludedIds }
    })
        .sort({ popularityScore: -1 })
        .skip(start)
        .limit(limit)
        .populate("authorId", "name")
        .select("title authorId coverImage");

    return books.map(book => ({
        bookId: book._id,
        title: book.title,
        author: book.authorId.name,
        coverImage: book.coverImage
    }));

};

export const getCurrentlyReading= async (limit,start,userId) => {
    const books= await OwnedBook.find({
        userId,
        status:"reading"
    })
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
    
    return books.map((book)=>{
        return{
            bookId: book.bookId._id,
            title:book.bookId.title,
            author:book.bookId.authorId.name,
        }
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
        let weight;

        if (book.status === "owned") {
            weight = 5;} 
        else if (book.status === "completed") {
            weight = 10;} 
        else {
            weight = 8;}

            
        for (const genre of book.bookId.genres) {
            genreWeights[genre] =(genreWeights[genre] || 0)+ weight;
        }
    
        authorWeights[book.bookId.authorId]=(authorWeights[book.bookId.authorId] || 0)+10+weight;

        if(book.bookId.seriesId){
            seriesWeights[book.bookId.seriesId]=(seriesWeights[book.bookId.seriesId] || 0)+weight+100;
        }
    }

    for(const book of favouriteBooks){
        for (const genre of book.bookId.genres) {
            genreWeights[genre] =(genreWeights[genre] || 0)+ 3;
        }
    
        authorWeights[book.bookId.authorId]=(authorWeights[book.bookId.authorId] || 0)+10+3;

        if(book.bookId.seriesId){
            seriesWeights[book.bookId.seriesId]=(seriesWeights[book.bookId.seriesId] || 0)+3+100;
        }
    }
        
    //weights on each book
    const books=await Book.find({_id:{$nin: excludedIds}}).select("title authorId coverImage genres seriesId");
    const result=[];
       
    for(const book of books){
        let totalscore=0;
        for(const genre of book.genres){
            totalscore+=genreWeights[genre]||0;
        }

        totalscore+=authorWeights[book.authorId]||0;
        if(book.seriesId){
            totalscore+=seriesWeights[book.seriesId]||0;
        }
        
        result.push({
            book:book,
            score:totalscore,});
    }

    result.sort((a, b) => b.score - a.score);
    const recommendedBooks = result.slice(start, start + limit).map(item => ({
        _id:item.book._id,
        title: item.book.title,
        author: item.book.authorId,
        coverImage: item.book.coverImage
    }));
    
    const topGenres = Object.keys(genreWeights)
    .sort((a, b) => genreWeights[b] - genreWeights[a])
    .slice(0, 5);

    const randomGenres = getRandomGenres(5-topGenres.length,topGenres);
    topGenres.push(...randomGenres);

    return {recommendedBooks,topGenres};
};



