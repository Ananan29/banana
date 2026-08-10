import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
    },
    { timestamps: true }
);

const Series = mongoose.model("Series", seriesSchema);

export default Series;