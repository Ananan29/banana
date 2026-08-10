import Book from "../models/book";

export const UserBooks=async(req,res,next)=>{
    try{
        const limit = req.query.limit?.trim() ? Number(req.query.limit) : NaN;
        const start = req.query.start?.trim() ? Number(req.query.start) : NaN;
        const userId=req.user.userId;
        const status=req.query.status?.trim().toLowerCase();

        if(Number.isNaN(limit)||Number.isNaN(start) || !["owned", "reading", "completed"].includes(status)){
            return res.status(400).json({
                message: "Invalid Query"
            });
        }

        const result=await getUserBooks(limit,start,userId,status);

        return res.status(200).json({
            title:status,
            books:result,
        });
    }
    catch(error){
        next(error);
    }

};




export const libraryPage=async(req,res,next)=>{
    try{    
        const userId=req.user.userId;

        const result  =await Promise.all([
            Book.find({userId,status:"reading"}).sort({updatedAt:-1}).limit(1),
            getUserBooks(10,0,userId,"owned"),
        ]);

        return res.status(200).json([
            {title:"Continue-Reading",
            books:result[0]},

            {title:"owned",
            books:result[1]},
        ]);
    }
    catch(error){
        next(error);
    }
};


const readBook=async(req,res,next)=>{
    const userId=req.user.userId;
    const bookId=req.params.bookId;
    const order=req.query.order?.trim() ? Number(req.query.order) : NaN;

    if(!bookId?.trim() || !mongoose.Types.ObjectId.isValid(bookId)){
        return res.status(400).json({
            message: "not valid bookid",
        });
    };

    const book=await OwnedBook.findOne({userId,bookId}).select("readingOrder status");

    if(!book){
        return res.status(400).json({
            message:"couldnt find book"
        })
    }
    if(!Number.isNaN(order)){
        if(!Number.isInteger(order) ||order>book.readingOrder.totalOrder || order<1){
            return res.status(400).json({
                message:"invalid order"
            });
        }
        if(order===book.readingOrder.totalOrder)
            {book.status="completed";}

        else
            {book.status="reading";}

        const result=await Chapter.findOne({bookId,order}).select("order chapter title content").lean();

        book.readingOrder.currentOrder=order;
        await book.save();

        return res.status(200).json({
            ...result,

        });
    }
                
    else{
        if(book.status==="completed")
            {book.readingOrder.currentOrder=1;book.status="reading";await book.save();}

        const result=await Chapter.findOne({bookId, order:book.readingOrder.currentOrder}).select("order chapter title content").lean()
        
        return res.status(200).json({
            ...result,
            readingOrder: book.readingOrder,
        });
    }


};


