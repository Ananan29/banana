import Book from "../models/book.js";
import Author from "../models/author.js";

export const authorPage= async(req,res,next)=>{
    const authorId=req.params.authorId;

    if(!mongoose.Types.ObjectId.isValid(authorId)){
        return res.status(400).json({
            message: "invalid query",
        }); 
    }

    const [books,author]=await Promise.all([
        Book.find({authorId}).select("title authorId coverImage").populate("authorId","name"),
        Author.findById(authorId),
    ]);

    if(!author){
        return res.status(404).json({
            message: "author doesnt exist",
        }); 
    }

    const result=books.map((book)=>{
        return {
            bookId:book._id,
            title:book.title,
            author:book.authorId.name,
            coverImage:book.coverImage,
        };
    });

    return res.status(200).json({
        author,
        books:result,
    })
};

// res should be added to cart


// export const addToCart= async(req,res,next)=>{
//     try{
//         const bookId=req.body.bookId;
//         const userId=req.user.userId;

//         if(!bookId?.trim() || !mongoose.Types.ObjectId.isValid(bookId)){
//             return res.status(400).json({
//                 message: "not valid bookid",
//             });
//         };

//         const ans=await Promise.all([
//             Book.findById(bookId),
//             OwnedBook.findOne(bookId,userId),
//         ]);

//         if(!ans[0] || ans[1])
//         {return res.status(400).json({
//             message:"invalid query"
//         });}

//         const result = await Promise.all([
//             Cart.findOneAndUpdate(
//                     {userId, bookId},
//                     {$setOnInsert: {userId, bookId}},
//                         {new: true,
//                         upsert: true}
//             ),
//             Favourite.deleteOne({ userId, bookId }),
//         ]);

//         return res.status(200).json(
//             result[0]
//         );
//     }
//     catch(error){
//         next(error);
//     }
// };

// export const cartPage=async(req,res,next)=>{
//     try{
//         const userId=req.user.userId;

//         const books=await Cart.find({userId}).populate({
//             path: "bookId",
//             select: "title authorId coverImage price",
//             populate: {
//                 path: "authorId",
//                 select:"name",
//             }
//         })
//         .select("bookId price");

//         const result=books.map((book)=>{
//             return{
//                 bookId:book.bookId._id,
//                 title:book.bookId.title,
//                 author:book.bookId.authorId.name,
//                 coverImage:book.bookId.coverImage,
//                 price:book.bookId.price,
//             }
//         });

//         return res.status(200).json(
//             result
//         );

//     }
//     catch(error){
//         next(error);
//     }
// };

// export const checkout=async(req,res,next)=>{
//     try{
//         const userId=req.user.userId;

//         const books=await Cart.find({userId}).populate({
//             path: "bookId",
//             select: "title authorId coverImage",
//             populate: {
//                 path: "authorId",
//                 select:"name",
//             }
//         })
//         .select("bookId price");

        



//     }
//     catch(error){
//         next(error);
//     }
// };