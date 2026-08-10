import OwnedBook from '../models/ownedBook.js';
import FavouriteBook from '../models/favourite.js';
import Book from '../models/book.js';
import Author from '../models/author.js';
import Series from '../models/series.js';
import {getTopRated,getRecentlyAdded,getExcludedIds,getRecentlyPublished,getGenreBooks,getUserBooks,getRecommendedBooks} from '../utils/functions.js';
import { getRandomGenres } from '../utils/extraFunctions.js';

export const dashboard= async(req,res,next)=>{
    try{
        const randomGenres = getRandomGenres(5);

        const [topRated, recentlyAdded, recentlyPublished,dashboardGenre] = await Promise.all([
        getTopRated(6,0,[]),
        getRecentlyAdded(6,0,[]),
        getRecentlyPublished(6,0,[]),
    
        Promise.all(
            randomGenres.map(async(genre)=>{
                return {
                    title:genre,
                    books: await getGenreBooks(6,0,[],genre)
                }
            })
        ),
    
        ]);

        const result =[
            {title: "Top Rated",
            books: topRated},

            {title: "Recently Added",
            books: recentlyAdded},

            {title: "New Releases",
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
        const excludedIds=await getExcludedIds(req.user.userId);

        const {recommendedBooks,topGenres}=await getRecommendedBooks(6,0,excludedIds,req.user.userId);                        
 
        const [topRated, recentlyAdded, recentlyPublished,currentlyReading,dashboardGenre] = await Promise.all([
        getTopRated(6,0,excludedIds),
        getRecentlyAdded(6,0,excludedIds),
        getRecentlyPublished(6,0,excludedIds),
        getUserBooks(6,0,req.user.userId,"reading"),
    
        Promise.all(
            topGenres.map(async (genre)=>{
                return {title:genre,
                        books:await getGenreBooks(6,0,excludedIds,genre)
                        }
            })
        )
        ]);

        const result =[
            {title: "Currently-Reading",
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




