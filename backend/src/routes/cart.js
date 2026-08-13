import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/:bookId", addToCart);
router.delete("/:bookId", removeFromCart);

export default router;
