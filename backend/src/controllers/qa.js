import mongoose from "mongoose";
import Book from "../models/book.js";
import OwnedBook from "../models/ownedBook.js";
import AppError from "../utils/AppError.js";
import { searchAllowedChunks } from "../services/typesenseChunks.js";

const MODES = ["spoiler-free", "spoilers"];
const CANNOT_ANSWER =
  "I cannot answer this without revealing information from later in the book.";

const askLlm = async (question, chunks) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new AppError("OPENAI_API_KEY is not set", 503);
  }

  const excerpts = chunks
    .map(
      (c, i) =>
        `[Excerpt ${i + 1} | order ${c.order} | ${c.chapterTitle}]\n${c.text}`
    )
    .join("\n\n");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You answer questions about a book using ONLY the excerpts provided. If the excerpts are not enough, say exactly: " +
            CANNOT_ANSWER +
            " Do not use outside knowledge. Do not mention later plot.",
        },
        {
          role: "user",
          content: `Excerpts:\n${excerpts}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new AppError("LLM request failed", 502);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || CANNOT_ANSWER;
};

export const askBookQuestion = async (req, res, next) => {
  try {
    const { bookId, question, mode } = req.body || {};
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return next(new AppError("not valid bookid", 400));
    }
    if (!question?.trim()) {
      return next(new AppError("question is required", 400));
    }
    if (!MODES.includes(mode)) {
      return next(new AppError('mode must be "spoiler-free" or "spoilers"', 400));
    }

    const book = await Book.findById(bookId).select("_id title");
    if (!book) {
      return next(new AppError("book doesn't exist", 404));
    }

    const owned = await OwnedBook.findOne({ userId, bookId }).select(
      "status readingOrder"
    );
    if (!owned) {
      return next(new AppError("You must own this book to ask questions", 403));
    }

    const maxOrder =
      mode === "spoilers"
        ? null
        : owned.status === "completed"
          ? owned.readingOrder.totalOrder
          : owned.readingOrder.currentOrder;

    const chunks = await searchAllowedChunks({
      bookId: bookId.toString(),
      question: question.trim(),
      maxOrder,
    });

    if (chunks.length === 0) {
      return res.status(200).json({
        bookId,
        mode,
        answer: CANNOT_ANSWER,
      });
    }

    const answer = await askLlm(question.trim(), chunks);

    return res.status(200).json({
      bookId,
      mode,
      answer,
    });
  } catch (error) {
    next(error);
  }
};
