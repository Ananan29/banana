import "dotenv/config";
import mongoose from "mongoose";
import { syncChapterChunksToTypesense } from "./src/services/typesenseChunks.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    await syncChapterChunksToTypesense();
  } catch (error) {
    console.error("Typesense chunk sync failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
