import "dotenv/config";
import mongoose from "mongoose";
import { syncBooksToTypesense } from "./src/services/typesenseBooks.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await syncBooksToTypesense();
  } catch (error) {
    console.error("Typesense sync failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
