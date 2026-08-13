import mongoose from "mongoose";
import Cart from "../models/cart.js";
import Book from "../models/book.js";
import OwnedBook from "../models/ownedBook.js";
import AppError from "../utils/AppError.js";

export const addToCart = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return next(new AppError("not valid bookid", 400));
    }

    const [book, owned] = await Promise.all([
      Book.findById(bookId).select("_id"),
      OwnedBook.findOne({ userId, bookId }).select("_id"),
    ]);

    if (!book) {
      return next(new AppError("book doesn't exist", 404));
    }
    if (owned) {
      return next(new AppError("Book already owned", 409));
    }

    const item = await Cart.findOneAndUpdate(
      { userId, bookId },
      { $setOnInsert: { userId, bookId } },
      { new: true, upsert: true }
    );

    return res.status(201).json({
      message: "Book added to cart",
      item,
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const items = await Cart.find({ userId }).populate({
      path: "bookId",
      select: "title authorId coverImage price",
      populate: { path: "authorId", select: "name" },
    });

    const books = items
      .filter((item) => item.bookId?.authorId)
      .map((item) => ({
        bookId: item.bookId._id,
        title: item.bookId.title,
        author: item.bookId.authorId.name,
        coverImage: item.bookId.coverImage,
        price: item.bookId.price,
      }));

    const total = books.reduce((sum, book) => sum + (book.price || 0), 0);

    return res.status(200).json({ books, total });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return next(new AppError("not valid bookid", 400));
    }

    const deleted = await Cart.findOneAndDelete({ userId, bookId });
    if (!deleted) {
      return next(new AppError("Book not found in cart", 404));
    }

    return res.status(200).json({
      message: "Book removed from cart",
      deletedBookId: bookId,
    });
  } catch (error) {
    next(error);
  }
};
