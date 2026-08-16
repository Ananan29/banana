import "dotenv/config";
import mongoose from "mongoose";
import Author from "./src/models/author.js";
import Series from "./src/models/series.js";
import Book from "./src/models/book.js";
import { authorsData as baseAuthors, seriesData as baseSeries, booksData as baseBooks } from "./seedData/catalog.js";
import { extraAuthorsData, extraSeriesData, extraBooksData } from "./seedData/extraCatalog.js";

const authorsData = [...baseAuthors, ...extraAuthorsData];
const seriesData = [...baseSeries, ...extraSeriesData];
const booksData = [...baseBooks, ...extraBooksData];

const seed = async () => {
  try {
    if (booksData.length !== 150) {
      throw new Error(`Expected booksData.length === 150, got ${booksData.length}`);
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      Author.deleteMany({}),
      Series.deleteMany({}),
      Book.deleteMany({}),
    ]);
    console.log("Cleared authors, series, and books collections");

    const authorDocs = await Author.insertMany(
      authorsData.map(({ name, bio, profileImage }) => ({
        name,
        bio,
        profileImage,
      }))
    );
    const authorIdByKey = Object.fromEntries(
      authorsData.map((a, i) => [a.key, authorDocs[i]._id])
    );

    const seriesDocs = await Series.insertMany(
      seriesData.map(({ title }) => ({ title }))
    );
    const seriesIdByKey = Object.fromEntries(
      seriesData.map((s, i) => [s.key, seriesDocs[i]._id])
    );

    const bookDocs = booksData.map(
      ({
        key: _key,
        authorKey,
        seriesKey,
        title,
        seriesNo,
        description,
        genres,
        coverImage,
        language,
        totalChapters,
        publishedAt,
        averageRating,
        ratingsCount,
        popularityScore,
        price,
      }) => {
        if (!authorIdByKey[authorKey]) {
          throw new Error(`Unknown authorKey: ${authorKey}`);
        }
        if (seriesKey != null && !seriesIdByKey[seriesKey]) {
          throw new Error(`Unknown seriesKey: ${seriesKey}`);
        }

        const doc = {
          title,
          authorId: authorIdByKey[authorKey],
          description,
          genres,
          coverImage,
          language,
          totalChapters,
          publishedAt: new Date(publishedAt),
          averageRating,
          ratingsCount,
          popularityScore,
          price,
        };

        if (seriesKey != null) {
          doc.seriesId = seriesIdByKey[seriesKey];
        }
        if (seriesNo != null) {
          doc.seriesNo = seriesNo;
        }

        return doc;
      }
    );

    await Book.insertMany(bookDocs);

    const [authorsCount, seriesCount, booksCount] = await Promise.all([
      Author.countDocuments(),
      Series.countDocuments(),
      Book.countDocuments(),
    ]);

    console.log(`Seeded authors: ${authorsCount}`);
    console.log(`Seeded series: ${seriesCount}`);
    console.log(`Seeded books: ${booksCount}`);
  } catch (error) {
    console.error("Seed failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
};

seed();
