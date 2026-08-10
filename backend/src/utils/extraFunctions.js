export const getRandomGenres = (limit, excludedGenres = [])=>{
    const genres = ["action","adventure","biography","business","comedy","crime","drama",
        "fantasy","historical","horror","mystery","romance","science-fiction","thriller","young-adult","children",];
    
    const availableGenres = genres.filter(
        genre => !excludedGenres.includes(genre)
    );
    return [...availableGenres].sort(() => Math.random() - 0.5).slice(0, limit);
};