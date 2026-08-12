import "dotenv/config";
import mongoose from "mongoose";
import Author from "./src/models/author.js";
import Series from "./src/models/series.js";
import Book from "./src/models/book.js";
import Chapter from "./src/models/chapter.js";
import User from "./src/models/users.js";
import OwnedBook from "./src/models/ownedBook.js";
import FavouriteBook from "./src/models/favourite.js";
import { authorsData, seriesData, booksData } from "./seedData/catalog.js";

const GENRES = [
  "action",
  "adventure",
  "biography",
  "business",
  "comedy",
  "crime",
  "drama",
  "fantasy",
  "historical",
  "horror",
  "mystery",
  "romance",
  "science-fiction",
  "thriller",
  "young-adult",
  "children",
];

function buildChapters(bookId, title, totalChapters) {
  const chapters = [];
  for (let i = 1; i <= totalChapters; i++) {
    chapters.push({
      bookId,
      title: `Chapter ${i}`,
      order: i,
      chapterNo: i,
      content: `Sample reading content for "${title}", chapter ${i}. This is seeded placeholder text so you can query chapters by bookId, order, and chapterNo.`,
    });
  }
  return chapters;
}

async function clearDatabase() {
  const collections = [
    "books",
    "authors",
    "series",
    "chapters",
    "users",
    "ownedbooks",
    "favouritebooks",
  ];

  for (const name of collections) {
    const exists = await mongoose.connection.db
      .listCollections({ name })
      .hasNext();
    if (!exists) {
      console.log(`skip empty: ${name}`);
      continue;
    }
    const result = await mongoose.connection.db.collection(name).deleteMany({});
    console.log(`cleared ${name}: ${result.deletedCount}`);
  }
}

function assertGenreCoverage(books) {
  const counts = Object.fromEntries(GENRES.map((g) => [g, 0]));
  for (const book of books) {
    for (const g of book.genres) counts[g] += 1;
  }
  const missing = GENRES.filter((g) => counts[g] < 5);
  if (missing.length) {
    throw new Error(
      `Genre coverage failed (<5): ${missing
        .map((g) => `${g}=${counts[g]}`)
        .join(", ")}`
    );
  }
  return counts;
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    if (booksData.length !== 50) {
      throw new Error(`Expected 50 books, got ${booksData.length}`);
    }

    const genreCounts = assertGenreCoverage(booksData);
    console.log("Genre coverage OK:", genreCounts);

    console.log("\nClearing old data...");
    await clearDatabase();

    console.log("\nInserting authors...");
    const authors = await Author.insertMany(
      authorsData.map(({ name, bio, profileImage }) => ({
        name,
        bio,
        profileImage,
      }))
    );
    const authorByKey = Object.fromEntries(
      authorsData.map((a, i) => [a.key, authors[i]])
    );

    console.log("Inserting series...");
    const seriesDocs = await Series.insertMany(
      seriesData.map(({ title }) => ({ title }))
    );
    const seriesByKey = Object.fromEntries(
      seriesData.map((s, i) => [s.key, seriesDocs[i]])
    );

    console.log("Inserting books...");
    const books = await Book.insertMany(
      booksData.map((b) => ({
        title: b.title,
        authorId: authorByKey[b.authorKey]._id,
        ...(b.seriesKey ? { seriesId: seriesByKey[b.seriesKey]._id } : {}),
        description: b.description,
        genres: b.genres,
        coverImage: b.coverImage,
        language: b.language,
        totalChapters: b.totalChapters,
        publishedAt: new Date(b.publishedAt),
        averageRating: b.averageRating,
        ratingsCount: b.ratingsCount,
        popularityScore: b.popularityScore,
      }))
    );
    const bookByKey = Object.fromEntries(
      booksData.map((b, i) => [b.key, books[i]])
    );

    console.log("Inserting chapters...");
    const allChapters = books.flatMap((book, i) =>
      buildChapters(book._id, book.title, booksData[i].totalChapters)
    );
    await Chapter.insertMany(allChapters);

    console.log("Creating test user...");
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "Password1",
    });

    const libraryPlan = [
      { key: "twilight", status: "owned", currentChapter: 0, currentOrder: 0 },
      { key: "silent-patient", status: "owned", currentChapter: 0, currentOrder: 0 },
      { key: "atomic-habits", status: "owned", currentChapter: 0, currentOrder: 0 },
      { key: "hp1", status: "reading", currentChapter: 4, currentOrder: 4 },
      { key: "dune1", status: "reading", currentChapter: 3, currentOrder: 3 },
      { key: "pride", status: "reading", currentChapter: 6, currentOrder: 6 },
      { key: "hg1", status: "completed", currentChapter: null, currentOrder: null },
      { key: "1984", status: "completed", currentChapter: null, currentOrder: null },
      { key: "anne-frank", status: "completed", currentChapter: null, currentOrder: null },
    ];

    for (const item of libraryPlan) {
      const book = bookByKey[item.key];
      const total = book.totalChapters;
      const currentChapter =
        item.status === "completed" ? total : item.currentChapter;
      const currentOrder =
        item.status === "completed" ? total : item.currentOrder;

      await OwnedBook.create({
        userId: user._id,
        bookId: book._id,
        status: item.status,
        readingOrder: {
          currentOrder,
          totalOrder: total,
        },
        readingProgress: {
          currentChapter,
          totalChapter: total,
        },
      });
    }

    const favKeys = ["gone-girl", "matilda", "becoming"];
    for (const key of favKeys) {
      await FavouriteBook.create({
        userId: user._id,
        bookId: bookByKey[key]._id,
      });
    }

    console.log("\n=== SEED COMPLETE ===");
    console.log(`Authors: ${authors.length}`);
    console.log(`Series: ${seriesDocs.length}`);
    console.log(`Books: ${books.length}`);
    console.log(`Chapters: ${allChapters.length}`);
    console.log(`User: ${user.email} / Password1 / id=${user._id}`);
    console.log("Owned: twilight, silent-patient, atomic-habits");
    console.log("Reading: hp1, dune1, pride");
    console.log("Completed: hg1, 1984, anne-frank");
    console.log("Favourites: gone-girl, matilda, becoming");
    console.log("\nSample book ids:");
    for (const key of ["twilight", "silent-patient", "hp1", "dune1", "hg1"]) {
      console.log(`- ${bookByKey[key].title}: ${bookByKey[key]._id}`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
