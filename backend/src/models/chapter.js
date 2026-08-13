import mongoose from "mongoose";

const chapterSchema=mongoose.Schema({
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required: true,
    },

    title:{
        type:String,
        required:true,
        trim:true,
    },

    order:{
        type:Number,
        required:true,
        default:1,
        min:1,
    },

    chapterNo:{
        type:Number,
        min :1,
        required:true,
    },

    content:{
       type:String,
        required:true, 
    },
},
    {timestamps:true,
    versionKey: false,
});

chapterSchema.index({ bookId: 1, order: 1 }, { unique: true });
const Chapter=mongoose.model("Chapter",chapterSchema);
        

export default Chapter;


