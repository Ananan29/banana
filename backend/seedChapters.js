import "dotenv/config";
import mongoose from "mongoose";
import Book from "./src/models/book.js";
import Chapter from "./src/models/chapter.js";

const buildChapterContent = (book, order, total) => {
  return [
    `Chapter ${order} of "${book.title}".`,
    book.description,
    `This chapter continues the story for readers at reading order ${order} of ${total}.`,
    `Key themes in this section relate to the book's genres: ${(book.genres || []).join(", ")}.`,
    `Characters and events introduced earlier may develop further here, but only up to this point in the narrative.`,
    `Sample reading text for GenAI retrieval: the protagonist faces a challenge, learns something new, and the plot moves forward without revealing later spoilers beyond chapter ${order}.`,
  ].join(" ");
};

const seedChapters = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const books = await Book.find().select("title description genres totalChapters");
    if (books.length === 0) {
      throw new Error("No books found. Run npm run seed first.");
    }

    await Chapter.deleteMany({});
    console.log("Cleared chapters");

    const chapters = [];
    for (const book of books) {
      const total = book.totalChapters || 10;
      for (let order = 1; order <= total; order++) {
        chapters.push({
          bookId: book._id,
          title: `Chapter ${order}`,
          order,
          chapterNo: order,
          content: buildChapterContent(book, order, total),
        });
      }
    }

    await Chapter.insertMany(chapters);
    console.log(`Seeded chapters: ${chapters.length} for ${books.length} books`);
  } catch (error) {
    console.error("Chapter seed failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
};

seedChapters();
