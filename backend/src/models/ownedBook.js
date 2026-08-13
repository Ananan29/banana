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

    transactionId: {
      type: String,
      trim: true,
    },
    
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
                    return value <= this.readingOrder.totalOrder;
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
},

    {timestamps:true,
    versionKey: false,});

ownedBookSchema.index({ userId: 1, bookId: 1 },{ unique: true });
ownedBookSchema.index({ status: 1 });

const OwnedBook=mongoose.model('OwnedBook',ownedBookSchema);

export default OwnedBook;


