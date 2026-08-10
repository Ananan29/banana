import "dotenv/config";
import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import bookRouter from "./src/routes/book.js";
import dashboardRouter from "./src/routes/dashboard.js"


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/dashboard",dashboardRouter);

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "website is running"
    });
});

const start = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();