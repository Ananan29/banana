import "dotenv/config";
import mongoose from "mongoose";
import Author from "./src/models/author.js";
import Series from "./src/models/series.js";
import Book from "./src/models/book.js";
import { authorsData, seriesData } from "./seedData/catalog.js";
import { extraAuthorsData, extraSeriesData, extraBooksData } from "./seedData/extraCatalog.js";

const allAuthors = [...authorsData, ...extraAuthorsData];
const allSeries = [...seriesData, ...extraSeriesData];

const seedMore = async () => {
  try {
    if (extraBooksData.length !== 50) {
      throw new Error(`Expected 50 extra books, got ${extraBooksData.length}`);
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    console.log("Database:", mongoose.connection.name);

    const authorIdByKey = {};
    for (const author of extraAuthorsData) {
      const doc = await Author.findOneAndUpdate(
        { name: author.name },
        {
          $setOnInsert: {
            name: author.name,
            bio: author.bio,
            profileImage: author.profileImage,
          },
        },
        { returnDocument: "after", upsert: true }
      );
      authorIdByKey[author.key] = doc._id;
    }

    for (const author of allAuthors) {
      if (authorIdByKey[author.key]) continue;
      const doc = await Author.findOne({ name: author.name }).select("_id");
      if (!doc) {
        throw new Error(`Author not found in MongoDB: ${author.name}`);
      }
      authorIdByKey[author.key] = doc._id;
    }

    const seriesIdByKey = {};
    for (const series of extraSeriesData) {
      const doc = await Series.findOneAndUpdate(
        { title: series.title },
        { $setOnInsert: { title: series.title } },
        { returnDocument: "after", upsert: true }
      );
      seriesIdByKey[series.key] = doc._id;
    }

    for (const series of allSeries) {
      if (seriesIdByKey[series.key]) continue;
      const doc = await Series.findOne({ title: series.title }).select("_id");
      if (doc) seriesIdByKey[series.key] = doc._id;
    }

    const existingTitles = new Set(
      (await Book.find().select("title").lean()).map((book) => book.title.toLowerCase())
    );

    const bookDocs = [];
    const skipped = [];
    for (const book of extraBooksData) {
      if (existingTitles.has(book.title.toLowerCase())) {
        skipped.push(book.title);
        continue;
      }
      if (!authorIdByKey[book.authorKey]) {
        throw new Error(`Unknown authorKey: ${book.authorKey} (${book.title})`);
      }
      if (book.seriesKey != null && !seriesIdByKey[book.seriesKey]) {
        throw new Error(`Unknown seriesKey: ${book.seriesKey} (${book.title})`);
      }

      const doc = {
        title: book.title,
        authorId: authorIdByKey[book.authorKey],
        description: book.description,
        genres: book.genres,
        coverImage: book.coverImage,
        language: book.language,
        totalChapters: book.totalChapters,
        publishedAt: new Date(book.publishedAt),
        averageRating: book.averageRating,
        ratingsCount: book.ratingsCount,
        popularityScore: book.popularityScore,
        price: book.price,
      };
      if (book.seriesKey != null) doc.seriesId = seriesIdByKey[book.seriesKey];
      if (book.seriesNo != null) doc.seriesNo = book.seriesNo;
      bookDocs.push(doc);
    }

    if (bookDocs.length) {
      await Book.insertMany(bookDocs);
    }

    console.log(`Added books: ${bookDocs.length}`);
    if (skipped.length) console.log(`Skipped existing: ${skipped.join(", ")}`);
    console.log(`Authors now: ${await Author.countDocuments()}`);
    console.log(`Series now: ${await Series.countDocuments()}`);
    console.log(`Books now: ${await Book.countDocuments()}`);
  } catch (error) {
    console.error("Seed more failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
};

seedMore();
