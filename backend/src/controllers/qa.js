import mongoose from "mongoose";
import Book from "../models/book.js";
import OwnedBook from "../models/ownedBook.js";
import AppError from "../utils/AppError.js";
import { askOllama } from "../services/ollama.js";
import { buildQaContext } from "../services/qaContext.js";

const MODES = ["spoiler-free", "spoilers"];
const CANNOT_ANSWER =
  "I cannot answer this without revealing information from later in the book.";
const NOT_FOUND = "The chapters you've already read don't say.";

const askLlm = async ({ question, chunks, explainingPassage, selected }) => {
  const excerpts = chunks
    .map(
      (c, i) =>
        `[Excerpt ${i + 1} | ${c.chapterTitle}]\n${c.text}`
    )
    .join("\n\n");

  if (explainingPassage) {
    return askOllama({
      system:
        "You help a reader understand a sentence already on their screen. " +
        "Use the nearby excerpt to see who is speaking. " +
        "Explain jokes, tone, and well-known references briefly. " +
        "Do not invent plot. Do not assume two names are a couple. " +
        "Fur, paws, leash, barking, or wearing someone's fur as a coat means an animal unless the excerpt says otherwise. " +
        "Answer in 3 to 5 short sentences. Never say you cannot answer because of spoilers.",
      prompt:
        `Selected line:\n${selected}\n\n` +
        `Nearby text:\n${excerpts}\n\n` +
        `Reader question:\n${question}\n\n` +
        "Explain the selected line.",
    });
  }

  const answer = await askOllama({
    system:
      "Answer using only the excerpts. " +
      "If the excerpts do not contain the answer, reply with exactly: " +
      NOT_FOUND +
      " Do not guess relationships, jobs, or species. No later plot. 2 to 4 sentences.",
    prompt: `Question: ${question}\n\nExcerpts:\n${excerpts}`,
  });

  return answer || NOT_FOUND;
};

export const askBookQuestion = async (req, res, next) => {
  try {
    const { bookId, question, mode, order, passage } = req.body || {};
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

    const requestedOrder = Number.isInteger(Number(order))
      ? Number(order)
      : owned.readingOrder.currentOrder;
    const totalOrder = owned.readingOrder.totalOrder || requestedOrder || 1;
    const currentOrder = owned.readingOrder.currentOrder || 1;

    const maxOrder =
      mode === "spoilers"
        ? null
        : owned.status === "completed"
          ? totalOrder
          : Math.min(Math.max(currentOrder, requestedOrder || currentOrder), totalOrder);

    const context = await buildQaContext({
      bookId,
      question: question.trim(),
      passage,
      order: requestedOrder || currentOrder,
      maxOrder,
    });

    if (context.explainingPassage && !context.passageFound) {
      return res.status(200).json({
        bookId,
        mode,
        answer: CANNOT_ANSWER,
      });
    }

    if (context.chunks.length === 0) {
      return res.status(200).json({
        bookId,
        mode,
        answer: NOT_FOUND,
      });
    }

    const answer = (await askLlm({
      question: question.trim(),
      chunks: context.chunks,
      explainingPassage: context.explainingPassage,
      selected: context.selected,
    })).trim();

    return res.status(200).json({
      bookId,
      mode,
      answer,
    });
  } catch (error) {
    next(error);
  }
};
