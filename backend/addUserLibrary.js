import "dotenv/config";
import mongoose from "mongoose";
import User from "./src/models/users.js";
import Book from "./src/models/book.js";
import OwnedBook from "./src/models/ownedBook.js";
import FavouriteBook from "./src/models/favourite.js";

const USER_EMAIL = "test@example.com";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({ email: USER_EMAIL });
    if (!user) {
      throw new Error("Test user not found. Run node createTestUser.js first.");
    }

    const books = await Book.find().sort({ popularityScore: -1 });
    if (books.length < 4) {
      throw new Error("Need more books. Run node seed.js first.");
    }

    // Own top 3 books (various statuses)
    const ownedSpecs = [
      { book: books[0], status: "owned", currentChapter: 0 },
      { book: books[1], status: "reading", currentChapter: 3 },
      { book: books[2], status: "completed", currentChapter: books[2].totalChapters },
    ];

    for (const spec of ownedSpecs) {
      const existing = await OwnedBook.findOne({
        userId: user._id,
        bookId: spec.book._id,
      });
      if (existing) {
        existing.status = spec.status;
        existing.reading_progress = {
          currentChapter: spec.currentChapter,
          totalChapter: spec.book.totalChapters,
        };
        await existing.save();
        console.log(`Updated owned: ${spec.book.title} (${spec.status})`);
      } else {
        await OwnedBook.create({
          userId: user._id,
          bookId: spec.book._id,
          status: spec.status,
          reading_progress: {
            currentChapter: spec.currentChapter,
            totalChapter: spec.book.totalChapters,
          },
        });
        console.log(`Created owned: ${spec.book.title} (${spec.status})`);
      }
    }

    // Favourite 2 different books (prefer ones not only in owned if possible)
    const favBooks = [books[3], books[4] || books[0]];
    for (const book of favBooks) {
      const existing = await FavouriteBook.findOne({
        userId: user._id,
        bookId: book._id,
      });
      if (existing) {
        console.log(`Favourite already exists: ${book.title}`);
      } else {
        await FavouriteBook.create({
          userId: user._id,
          bookId: book._id,
        });
        console.log(`Created favourite: ${book.title}`);
      }
    }

    const owned = await OwnedBook.find({ userId: user._id }).populate(
      "bookId",
      "title"
    );
    const favs = await FavouriteBook.find({ userId: user._id }).populate(
      "bookId",
      "title"
    );

    console.log("\n--- Owned books ---");
    for (const row of owned) {
      console.log(`- ${row.bookId?.title} [${row.status}] id=${row.bookId?._id}`);
    }

    console.log("\n--- Favourites ---");
    for (const row of favs) {
      console.log(`- ${row.bookId?.title} id=${row.bookId?._id}`);
    }

    console.log(
      "\nThese should be excluded from Top-Rated when using the test user Bearer token."
    );

    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
};

run();
