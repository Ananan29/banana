import mongoose from "mongoose";


const bookSchema= new mongoose.Schema({
    title:{
        type: String,
        trim:true,
        required:true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },

    seriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series",
    },

    seriesNo:{
        type:Number,
        min:1,
    },

    price:{
        type:Number,
        min:1,
        required: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
    },

    genres: {
        required: true,
        type:[{
            type: String,
            trim: true,
            lowercase:true,
            enum: ["action","adventure","biography","business","comedy","crime","drama","fantasy","historical",
            "horror","mystery","romance","science-fiction","thriller","young-adult","children",]}],
        validate: {
            validator: (genres) => genres.length > 0,
            message: "At least one genre is required.",
        },
    },

    coverImage: {
        type: String,
        required: true,
        trim: true,
    },

    language:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        enum: ["english","hindi","spanish","french","german","italian","portuguese","russian","japanese",
        "korean","chinese","arabic"]},

    totalChapters: {
        type: Number,
        required: true,
    },

    publishedAt: {
        type: Date,
        required: true,
    },
    
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    ratingsCount: {
        type: Number,
        default: 0,
        min: 0,
    },

    popularityScore: {
    type: Number,
    default: 0
    },
},

    {timestamps: true,
    versionKey: false,
}
);

bookSchema.index({genres: 1});
bookSchema.index({publishedAt: -1});
bookSchema.index({popularityScore:-1});
bookSchema.index({updatedAt:-1});

bookSchema.pre("save", function () {
    this.popularityScore =this.averageRating * Math.log10(this.ratingsCount + 1);
});

const Book=mongoose.model('Book',bookSchema);

export default Book;
