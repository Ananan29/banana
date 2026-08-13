
import {getExcludedIds,getGenreBooks} from '../utils/functions.js';


export const genreBooks = async (req, res, next) => {
    try{
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);
        const genre = req.params.genre?.trim().toLowerCase();
        

        if (!Number.isInteger(limit) || !Number.isInteger(start) || !genre || limit <= 0 || start < 0) {
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