import "dotenv/config";
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import bookRouter from "./src/routes/book.js";
import dashboardRouter from "./src/routes/dashboard.js";
import libraryRouter from "./src/routes/library.js";
import wishlistRouter from "./src/routes/wishlist.js";
import searchRouter from "./src/routes/search.js";
import qaRouter from "./src/routes/qa.js";
import authorRouter from "./src/routes/author.js";
import seriesRouter from "./src/routes/series.js";
import genresRouter from "./src/routes/genres.js";
import authRouter from "./src/routes/auth.js";
import cartRouter from "./src/routes/cart.js";
import paymentRouter from "./src/routes/payment.js";
import { razorpayWebhook } from "./src/controllers/payment.js";
import errorMiddleware, { notFound } from "./src/middleware/error.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Razorpay needs the raw body for webhook signature verification
app.post(
  "/api/webhooks/razorpay",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);

app.use(express.json());

app.use("/api/book", bookRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/library", libraryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/search", searchRouter);
app.use("/api/qa", qaRouter);
app.use("/api/author", authorRouter);
app.use("/api/series", seriesRouter);
app.use("/api/genre", genresRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "website is running",
  });
});

app.use(notFound);
app.use(errorMiddleware);

const start = async () => {
  await connectDB();
  

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server:", error.message || error);
  process.exit(1);
});
