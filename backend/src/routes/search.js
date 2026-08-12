import express from "express";
import { searchBooks } from "../controllers/search.js";

const router = express.Router();

router.get("/", searchBooks);

export default router;