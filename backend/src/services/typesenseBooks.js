import typesense from "../config/typesense.js";
import Book from "../models/book.js";
import "../models/author.js";

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
  const collections = await typesense.collections().retrieve();
  const exists = collections.some((c) => c.name === "books");
  if (exists) return;
  await typesense.collections().create(booksSchema);
};

export const indexBooks = async () => {
  const books = await Book.find().populate("authorId", "name");

  const documents = books
    .filter((book) => book.authorId?.name)
    .map((book) => ({
      id: book._id.toString(),
      title: book.title,
      author: book.authorId.name,
      genres: book.genres,
      description: book.description || "",
      popularityScore: book.popularityScore || 0,
    }));

  if (documents.length === 0) {
    console.log("No books to index");
    return 0;
  }

  await typesense
    .collections("books")
    .documents()
    .import(documents, { action: "upsert" });

  return documents.length;
};

export const syncBooksToTypesense = async () => {
  await createBooksCollection();
  const count = await indexBooks();
  console.log(`Typesense synced ${count} books`);
};