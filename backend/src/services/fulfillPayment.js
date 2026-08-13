import Book from "../models/book.js";
import OwnedBook from "../models/ownedBook.js";
import FavouriteBook from "../models/favourite.js";
import Cart from "../models/cart.js";
import Payment from "../models/payment.js";


export const fulfillPaidOrder = async ({
  razorpayOrderId,
  razorpayPaymentId,
}) => {
  const existing = await Payment.findOne({ razorpayOrderId });
  if (!existing) {
    return { ok: false, reason: "order_not_found" };
  }
  if (existing.status === "paid") {
    return { ok: true, alreadyPaid: true, payment: existing };
  }

  const update = { status: "paid" };
  if (razorpayPaymentId) {
    update.razorpayPaymentId = razorpayPaymentId;
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId, status: "created" },
    { $set: update },
    { new: true }
  );

  if (!payment) {
    const again = await Payment.findOne({ razorpayOrderId });
    if (again?.status === "paid") {
      return { ok: true, alreadyPaid: true, payment: again };
    }
    return { ok: false, reason: "not_fulfillable" };
  }

  const books = await Book.find({ _id: { $in: payment.bookIds } }).select(
    "_id totalChapters"
  );
  const bookMap = new Map(books.map((b) => [b._id.toString(), b]));

  for (const bookId of payment.bookIds) {
    const book = bookMap.get(bookId.toString());
    if (!book) continue;

    await OwnedBook.updateOne(
      { userId: payment.userId, bookId },
      {
        $setOnInsert: {
          userId: payment.userId,
          bookId,
          transactionId: razorpayPaymentId || payment.razorpayOrderId,
          status: "owned",
          readingOrder: {
            currentOrder: 1,
            totalOrder: book.totalChapters,
          },
        },
      },
      { upsert: true }
    );
  }

  await Promise.all([
    FavouriteBook.deleteMany({
      userId: payment.userId,
      bookId: { $in: payment.bookIds },
    }),
    Cart.deleteMany({
      userId: payment.userId,
      bookId: { $in: payment.bookIds },
    }),
  ]);

  return { ok: true, alreadyPaid: false, payment };
};
