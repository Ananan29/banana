import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Book from "./src/models/book.js";

const getBookIds = async () => {
    try {
        await connectDB();

        console.log("Database:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);

        const books = await Book.find({})
            .select("_id title")
            .lean();

        console.log(`Found ${books.length} books:\n`);

        books.forEach((book, index) => {
            console.log(
                `${index + 1}. ${book._id} - ${book.title}`
            );
        });

    } catch (error) {
        console.error("Failed:", error);
    } finally {
        await mongoose.disconnect();
    }
};

getBookIds();