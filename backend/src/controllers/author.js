export const authorPage= async(req,res,next)=>{
    const authorId=req.params.authorId;

    if(!authorId?.trim()){
        return res.status(400).json({
            message: "invalid query",
        }); 
    }

    const [books,author]=await Promise.all([
        Book.find({authorId}).select("title authorId coverImage").populate("authorId","name"),
        Author.findById({authorId}),
    ]);

    if(!author || !books){
        return res.status(404).json({
            message: "coundn't find the author and books",
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
}