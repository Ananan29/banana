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
    },

    order:{
        type:Number,
        required:true,
        min :1
    },

    chapterNo:{
        type:Number,
        min :1
    },
    content:{
       type:String,
        required:true, 
    },
},
    {timestamps:true,
    versionKey: false,
});


const Chapter=mongoose.model("Chapter",chapterSchema);
        

export default Chapter;


