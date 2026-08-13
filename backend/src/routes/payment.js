import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  checkout,
  verifyPayment,
  getPaymentStatus,
} from "../controllers/payment.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/checkout", checkout);
router.post("/verify", verifyPayment);
router.get("/:orderId", getPaymentStatus);

export default router;
