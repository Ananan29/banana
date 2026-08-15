import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import OwnedBook from "./src/models/ownedBook.js";
import Book from "./src/models/book.js";

const userId = "6a7f18dd3ae0d4050cc5bd32";

const bookIds = [
    "6a7f1cffa0518633c7d06b7d",
    "6a7f1cffa0518633c7d06b7e",
    "6a7f1cffa0518633c7d06b7f",
    "6a7f1cffa0518633c7d06b80",
    "6a7f1cffa0518633c7d06b81",
    "6a7f1cffa0518633c7d06b82",
    "6a7f1cffa0518633c7d06b83",
    "6a7f1cffa0518633c7d06b84",
    "6a7f1cffa0518633c7d06b85",
    "6a7f1cffa0518633c7d06b86",
    "6a7f1cffa0518633c7d06b87",
    "6a7f1cffa0518633c7d06b88",
    "6a7f1cffa0518633c7d06b89",
    "6a7f1cffa0518633c7d06b8a",
    "6a7f1cffa0518633c7d06b8b",
    "6a7f1cffa0518633c7d06b8c",
    "6a7f1cffa0518633c7d06b8d",
    "6a7f1cffa0518633c7d06b8e",
    "6a7f1cffa0518633c7d06b8f",
    "6a7f1cffa0518633c7d06b90",
    "6a7f1cffa0518633c7d06b91",
    "6a7f1cffa0518633c7d06b92",
    "6a7f1cffa0518633c7d06b93",
    "6a7f1cffa0518633c7d06b94",
    "6a7f1cffa0518633c7d06b95",
    "6a7f1cffa0518633c7d06b96",
    "6a7f1cffa0518633c7d06b97",
    "6a7f1cffa0518633c7d06b98",
    "6a7f1cffa0518633c7d06b99",
    "6a7f1cffa0518633c7d06b9a",
    "6a7f1cffa0518633c7d06b9b",
    "6a7f1cffa0518633c7d06b9c",
    "6a7f1cffa0518633c7d06b9d",
    "6a7f1cffa0518633c7d06b9e",
    "6a7f1cffa0518633c7d06b9f",
    "6a7f1cffa0518633c7d06ba0",
    "6a7f1cffa0518633c7d06ba1",
    "6a7f1cffa0518633c7d06ba2",
    "6a7f1cffa0518633c7d06ba3",
    "6a7f1cffa0518633c7d06ba4",
    "6a7f1cffa0518633c7d06ba5",
    "6a7f1cffa0518633c7d06ba6",
    "6a7f1cffa0518633c7d06ba7",
    "6a7f1cffa0518633c7d06ba8",
    "6a7f1cffa0518633c7d06ba9",
    "6a7f1cffa0518633c7d06baa",
    "6a7f1cffa0518633c7d06bab",
    "6a7f1cffa0518633c7d06bac",
    "6a7f1cffa0518633c7d06bad",
    "6a7f1cffa0518633c7d06bae",
    "6a7f1cffa0518633c7d06baf",
    "6a7f1cffa0518633c7d06bb0",
    "6a7f1cffa0518633c7d06bb1",
    "6a7f1cffa0518633c7d06bb2",
    "6a7f1cffa0518633c7d06bb3",
    "6a7f1cffa0518633c7d06bb4",
    "6a7f1cffa0518633c7d06bb5",
    "6a7f1cffa0518633c7d06bb6",
    "6a7f1cffa0518633c7d06bb7",
    "6a7f1cffa0518633c7d06bb8",
    "6a7f1cffa0518633c7d06bb9",
    "6a7f1cffa0518633c7d06bba",
    "6a7f1cffa0518633c7d06bbb",
    "6a7f1cffa0518633c7d06bbc",
    "6a7f1cffa0518633c7d06bbd",
    "6a7f1cffa0518633c7d06bbe",
    "6a7f1cffa0518633c7d06bbf",
    "6a7f1cffa0518633c7d06bc0",
    "6a7f1cffa0518633c7d06bc1",
    "6a7f1cffa0518633c7d06bc2",
    "6a7f1cffa0518633c7d06bc3",
    "6a7f1cffa0518633c7d06bc4",
    "6a7f1cffa0518633c7d06bc5",
    "6a7f1cffa0518633c7d06bc6",
    "6a7f1cffa0518633c7d06bc7",
    "6a7f1cffa0518633c7d06bc8",
    "6a7f1cffa0518633c7d06bc9",
    "6a7f1cffa0518633c7d06bca",
    "6a7f1cffa0518633c7d06bcb",
    "6a7f1cffa0518633c7d06bcc",
    "6a7f1cffa0518633c7d06bcd",
    "6a7f1cffa0518633c7d06bce",
    "6a7f1cffa0518633c7d06bcf",
    "6a7f1cffa0518633c7d06bd0",
    "6a7f1cffa0518633c7d06bd1",
    "6a7f1cffa0518633c7d06bd2",
    "6a7f1cffa0518633c7d06bd3",
    "6a7f1cffa0518633c7d06bd4",
    "6a7f1cffa0518633c7d06bd5",
    "6a7f1cffa0518633c7d06bd6",
    "6a7f1cffa0518633c7d06bd7",
    "6a7f1cffa0518633c7d06bd8",
    "6a7f1cffa0518633c7d06bd9",
    "6a7f1cffa0518633c7d06bda",
    "6a7f1cffa0518633c7d06bdb",
    "6a7f1cffa0518633c7d06bdc",
    "6a7f1cffa0518633c7d06bdd",
    "6a7f1cffa0518633c7d06bde",
    "6a7f1cffa0518633c7d06bdf",
    "6a7f1cffa0518633c7d06be0",
];

const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const getCurrentOrder = (status, totalOrder) => {
    if (status === "owned") {
        return 0;
    }

    if (status === "completed") {
        return totalOrder;
    }

    // Reading: random progress between 10% and 85%
    const percentage =
        Math.floor(Math.random() * 76 + 10) / 100;

    return Math.max(
        1,
        Math.min(
            totalOrder - 1,
            Math.floor(totalOrder * percentage)
        )
    );
};

const seedOwnedBooks = async () => {
    try {
        await connectDB();

        console.log("Connected to MongoDB");
        console.log(`Creating library for user: ${userId}`);

        // Pick 25 random books
        const selectedBooks = shuffle(bookIds).slice(0, 25);

        console.log(`Selected ${selectedBooks.length} random books`);
        console.log("--------------------------------");

        for (let i = 0; i < selectedBooks.length; i++) {
            const bookId = selectedBooks[i];

            const book = await Book.findById(bookId).select(
                "title totalChapters"
            );

            if (!book) {
                console.log(`❌ Book not found: ${bookId}`);
                continue;
            }

            /*
                Distribution across the 25 books:

                0 - 5   → completed
                6 - 15  → reading
                16 - 24 → owned
            */
            let status;

            if (i < 6) {
                status = "completed";
            } else if (i < 16) {
                status = "reading";
            } else {
                status = "owned";
            }

            const totalOrder = Math.max(
                book.totalChapters || 1,
                1
            );

            const currentOrder = getCurrentOrder(
                status,
                totalOrder
            );

            const result = await OwnedBook.updateOne(
                {
                    userId,
                    bookId,
                },
                {
                    $set: {
                        status,
                        readingOrder: {
                            currentOrder,
                            totalOrder,
                        },
                    },
                    $setOnInsert: {
                        userId,
                        bookId,
                    },
                },
                {
                    upsert: true,
                }
            );

            if (result.upsertedCount > 0) {
                console.log(
                    `✓ Added: ${book.title} | ${status} | ${currentOrder}/${totalOrder}`
                );
            } else {
                console.log(
                    `↻ Updated: ${book.title} | ${status} | ${currentOrder}/${totalOrder}`
                );
            }
        }

        console.log("--------------------------------");
        console.log("✅ Library seed complete!");

    } catch (error) {
        console.error("❌ Seed failed:");
        console.error(error);

        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedOwnedBooks();