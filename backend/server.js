import "dotenv/config";
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import bookRouter from "./src/routes/book.js";
import dashboardRouter from "./src/routes/dashboard.js";
import libraryRouter from "./src/routes/library.js";
import wishlistRouter from "./src/routes/wishlist.js";
import searchRouter from "./src/routes/search.js";
import errorMiddleware from "./src/middleware/error.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/library", libraryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/search", searchRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "website is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorMiddleware);

const start = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
