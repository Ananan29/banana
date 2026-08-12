import mongoose from "mongoose";
const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        bio: {
            type: String,
            trim: true,
            maxlength: 2000,
        },

        profileImage: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true , versionKey: false,}
);

const Author = mongoose.model("Author", authorSchema);

export default Author;