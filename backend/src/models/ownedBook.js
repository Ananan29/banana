import mongoose from "mongoose";

const ownedBookSchema=new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true},
    
    bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true},

    transactionId:{},
    
    status:{
        type: String,
        lowercase: true,
        trim: true,
        enum: ["owned", "reading", "completed"],
        default: "owned",
        required: true,
    },

    readingOrder:{
        currentOrder:{
            type:Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value <= this.totalOrder;
                },
                message: "currentOrder cannot be greater than totalOrder"
            }
        },
        totalOrder:{
            type:Number,
            min:1,
            required: true,
        },
    },

    readingProgress:{
        currentChapter: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value <= this.totalChapter;
                },
                message: "currentChapter cannot be greater than totalChapter"
            }
        },

        totalChapter: {
            type: Number,
            required: true,
            min:1
        },
    }
},

    {timestamps:true});

const OwnedBook=mongoose.model('OwnedBook',ownedBookSchema);

export default OwnedBook;


