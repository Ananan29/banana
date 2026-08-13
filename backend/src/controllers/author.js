import mongoose from "mongoose";
import Book from "../models/book.js";
import Author from "../models/author.js";

export const authorPage = async (req, res, next) => {
  try {
    const authorId = req.params.authorId;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        message: "invalid query",
      });
    }

    const [books, author] = await Promise.all([
      Book.find({ authorId })
        .select("title authorId coverImage")
        .populate("authorId", "name"),
      Author.findById(authorId),
    ]);

    if (!author) {
      return res.status(404).json({
        message: "author doesnt exist",
      });
    }

    const result = books.map((book) => {
      return {
        bookId: book._id,
        title: book.title,
        author: book.authorId.name,
        coverImage: book.coverImage,
      };
    });

    return res.status(200).json({
      author,
      books: result,
    });
  } catch (error) {
    next(error);
  }
};
