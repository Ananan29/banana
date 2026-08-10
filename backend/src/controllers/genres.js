
import {getExcludedIds,getGenreBooks} from '../utils/functions.js';


export const genreBooks = async (req, res, next) => {
    try{
        const limit = req.query.limit?.trim() ? Number(req.query.limit) : NaN;
        const start = req.query.start?.trim() ? Number(req.query.start) : NaN;
        const genre = (req.params.genre || req.query.genre)?.trim().toLowerCase();

        

        if (Number.isNaN(limit) || Number.isNaN(start) || !genre) {
            return res.status(400).json({
                message: "bad query"
            });
        };
        
        const excludedIds=await getExcludedIds(req.user?.userId);

        const result=await getGenreBooks(limit,start,excludedIds,genre);
        return res.status(200).json(
            result
        );

    }
    catch(error){
        next(error);
    }
};