import typesense from "../config/typesense.js";
import Book from "../models/Book.js";

const booksSchema = {
  name: "books",
  fields: [
    { name: "title", type: "string" },
    { name: "author", type: "string" },
    { name: "genres", type: "string[]" },
    { name: "description", type: "string" },
    { name: "popularityScore", type: "float" },
  ]
};

export const createBooksCollection = async () => {
    try {
        await typesense.collections().create(booksSchema);
    }
    catch (error){
        console.log(error);
    }
};

export const indexBooks = async () => {
    try {
        const books = await Book.find().populate("authorId", "name");

        const documents = books.map((book) => ({
            id: book._id.toString(),
            title: book.title,
            author: book.authorId.name,
            genres: book.genres,
            description: book.description,
            popularityScore: book.popularityScore,
        }));

        if (documents.length > 0) {
            await typesense
                .collections("books")
                .documents()
                .import(documents, { action: "upsert" });
        }
    } 
    catch (error) {
        console.log("Indexing error:", error);
    }
};