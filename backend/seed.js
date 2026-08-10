import "dotenv/config";
import mongoose from "mongoose";
import Author from "./src/models/author.js";
import Book from "./src/models/book.js";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const authors = await Author.insertMany([
      {
        name: "Elena Marsh",
        bio: "Fantasy novelist",
        profileImage: "https://placehold.co/200x200",
      },
      {
        name: "James Cole",
        bio: "Thriller writer",
        profileImage: "https://placehold.co/200x200",
      },
      {
        name: "Priya Nair",
        bio: "Romance and drama author",
        profileImage: "https://placehold.co/200x200",
      },
    ]);

    const [elena, james, priya] = authors;

    const books = await Book.insertMany([
      {
        title: "Shadow of the Crown",
        authorId: elena._id,
        seriesId: null,
        description: "A young heir must reclaim a stolen kingdom.",
        genres: ["fantasy", "adventure"],
        coverImage: "https://placehold.co/300x450?text=Shadow+Crown",
        language: "english",
        totalChapters: 24,
        publishedAt: new Date("2024-01-15"),
        averageRating: 4.5,
        ratingsCount: 120,
        popularityScore: 95,
      },
      {
        title: "Night Protocol",
        authorId: james._id,
        seriesId: null,
        description: "A hacker uncovers a conspiracy inside a tech empire.",
        genres: ["thriller", "crime"],
        coverImage: "https://placehold.co/300x450?text=Night+Protocol",
        language: "english",
        totalChapters: 18,
        publishedAt: new Date("2025-06-01"),
        averageRating: 4.2,
        ratingsCount: 80,
        popularityScore: 88,
      },
      {
        title: "Letters to December",
        authorId: priya._id,
        seriesId: null,
        description: "Two strangers fall in love through forgotten letters.",
        genres: ["romance", "drama"],
        coverImage: "https://placehold.co/300x450?text=Letters+December",
        language: "english",
        totalChapters: 16,
        publishedAt: new Date("2023-11-20"),
        averageRating: 4.8,
        ratingsCount: 200,
        popularityScore: 99,
      },
      {
        title: "The Last Orbit",
        authorId: elena._id,
        seriesId: null,
        description: "A crew stranded near Mars fights to survive.",
        genres: ["science-fiction", "action"],
        coverImage: "https://placehold.co/300x450?text=Last+Orbit",
        language: "english",
        totalChapters: 22,
        publishedAt: new Date("2025-12-10"),
        averageRating: 4.1,
        ratingsCount: 60,
        popularityScore: 75,
      },
      {
        title: "House on Hollow Street",
        authorId: james._id,
        seriesId: null,
        description: "A family moves into a house that remembers everything.",
        genres: ["horror", "mystery"],
        coverImage: "https://placehold.co/300x450?text=Hollow+Street",
        language: "english",
        totalChapters: 14,
        publishedAt: new Date("2022-08-05"),
        averageRating: 3.9,
        ratingsCount: 45,
        popularityScore: 70,
      },
      {
        title: "Laugh Track",
        authorId: priya._id,
        seriesId: null,
        description: "A failing comedian finds fame in the wrong city.",
        genres: ["comedy", "drama"],
        coverImage: "https://placehold.co/300x450?text=Laugh+Track",
        language: "english",
        totalChapters: 12,
        publishedAt: new Date("2024-05-18"),
        averageRating: 4.0,
        ratingsCount: 30,
        popularityScore: 65,
      },
      {
        title: "Empire of Glass",
        authorId: elena._id,
        seriesId: null,
        description: "A detective hunts a jewel thief across Europe.",
        genres: ["mystery", "thriller"],
        coverImage: "https://placehold.co/300x450?text=Empire+Glass",
        language: "english",
        totalChapters: 20,
        publishedAt: new Date("2026-01-02"),
        averageRating: 4.6,
        ratingsCount: 150,
        popularityScore: 92,
      },
      {
        title: "Moonlight Bakery",
        authorId: priya._id,
        seriesId: null,
        description: "A small bakery becomes the heart of a quiet town.",
        genres: ["romance", "young-adult"],
        coverImage: "https://placehold.co/300x450?text=Moonlight+Bakery",
        language: "english",
        totalChapters: 15,
        publishedAt: new Date("2025-03-09"),
        averageRating: 4.3,
        ratingsCount: 90,
        popularityScore: 82,
      },
    ]);

    console.log(`Seeded ${authors.length} authors and ${books.length} books`);
    console.log("\nBook IDs for Postman:");
    for (const book of books) {
      console.log(`- ${book.title}: ${book._id}`);
    }

    await mongoose.disconnect();
    console.log("\nDone.");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
