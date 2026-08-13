import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

cartSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
