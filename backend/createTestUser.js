import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./src/models/users.js";
import OwnedBook from "./src/models/ownedBook.js";
import Book from "./src/models/book.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    let user = await User.findOne({ email: "test@example.com" }).select("+password");
    if (!user) {
      user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "Password1",
      });
      console.log("Created user");
    } else {
      console.log("User already exists");
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const book = await Book.findOne().sort({ popularityScore: -1 });
    if (!book) {
      throw new Error("No books found. Run node seed.js first.");
    }

    let owned = await OwnedBook.findOne({ userId: user._id, bookId: book._id });
    if (!owned) {
      owned = await OwnedBook.create({
        userId: user._id,
        bookId: book._id,
        status: "owned",
        reading_progress: {
          currentChapter: 0,
          totalChapter: book.totalChapters,
        },
      });
      console.log("Created owned book link");
    } else {
      console.log("Owned book already linked");
    }

    console.log("\n--- Use in Postman ---");
    console.log("User ID:", user._id.toString());
    console.log("Email: test@example.com");
    console.log("Password: Password1");
    console.log("Owned book (should be excluded when logged in):", book.title);
    console.log("Owned bookId:", book._id.toString());
    console.log("\nBearer token:\n" + token);
    console.log("\nGET http://localhost:5000/api/books/Top-Rated?limit=10&start=0");
    console.log("Authorization: Bearer <paste token above>");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed:", error.message);
    process.exit(1);
  }
};

run();
