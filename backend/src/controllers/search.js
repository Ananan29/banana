import mongoose from "mongoose";
import typesense from "../config/typesense.js";
import Book from "../models/book.js";
import "../models/author.js";

const toSearchCard = (book) => ({
    bookId: book._id,
    title: book.title,
    author: book.authorId?.name || "",
    coverImage: book.coverImage,
});

const searchMongo = async (q, limit, start) => {
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

    const books = await Book.find()
        .populate("authorId", "name")
        .sort({ popularityScore: -1 })
        .select("title coverImage authorId genres description");

    const matches = books.filter((book) => {
        const author = book.authorId?.name || "";
        const genres = (book.genres || []).join(" ");
        return (
            regex.test(book.title || "") ||
            regex.test(author) ||
            regex.test(genres) ||
            regex.test(book.description || "")
        );
    });

    return {
        found: matches.length,
        books: matches.slice(start, start + limit).map(toSearchCard),
    };
};

const hydrateTypesenseHits = async (hits) => {
    const ids = hits
        .map((hit) => hit.document?.id)
        .filter((id) => mongoose.Types.ObjectId.isValid(id));

    if (ids.length === 0) return [];

    const books = await Book.find({ _id: { $in: ids } })
        .populate("authorId", "name")
        .select("title coverImage authorId");

    const byId = new Map(books.map((book) => [String(book._id), book]));

    return ids
        .map((id) => byId.get(String(id)))
        .filter(Boolean)
        .map(toSearchCard);
};

export const searchBooks = async (req, res, next) => {
    try {
        const { q } = req.query;
        const limit = Number(req.query.limit);
        const start = Number(req.query.start);

        if (!q || !q.trim()) {
            return res.status(400).json({
                message: "Search query is required",
            });
        }

        if (!Number.isInteger(limit) || !Number.isInteger(start) || limit <= 0 || start < 0) {
            return res.status(400).json({
                message: "limit and start must be valid numbers",
            });
        }

        const query = q.trim();

        try {
            const results = await typesense
                .collections("books")
                .documents()
                .search({
                    q: query,
                    query_by: "title,author,genres,description",
                    per_page: limit,
                    offset: start,
                    sort_by: "_text_match:desc,popularityScore:desc",
                });

            const books = await hydrateTypesenseHits(results.hits);
            if (results.hits.length > 0 && books.length === 0) {
                throw new Error("Typesense ids are stale");
            }

            return res.status(200).json({
                books,
                found: results.found,
                start,
                limit,
            });
        } catch (error) {
            const results = await searchMongo(query, limit, start);
            return res.status(200).json({
                ...results,
                start,
                limit,
            });
        }
    } catch (error) {
        next(error);
    }
};
