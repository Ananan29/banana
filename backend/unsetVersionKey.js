import "dotenv/config";
import mongoose from "mongoose";

const collections = [
  "books",
  "authors",
  "series",
  "users",
  "ownedbooks",
  "favouritebooks",
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  for (const name of collections) {
    const exists = await mongoose.connection.db
      .listCollections({ name })
      .hasNext();
    if (!exists) {
      console.log(`${name}: skipped (not found)`);
      continue;
    }
    const result = await mongoose.connection.db
      .collection(name)
      .updateMany({}, { $unset: { __v: "" } });
    console.log(
      `${name}: matched=${result.matchedCount} modified=${result.modifiedCount}`
    );
  }

  await mongoose.disconnect();
  console.log("Done — __v removed from stored documents.");
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
