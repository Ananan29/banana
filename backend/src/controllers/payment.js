import crypto from "crypto";
import Cart from "../models/cart.js";
import Payment from "../models/payment.js";
import AppError from "../utils/AppError.js";
import getRazorpay from "../config/razorpay.js";
import { fulfillPaidOrder } from "../services/fulfillPayment.js";

export const checkout = async (req, res, next) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return next(new AppError("Razorpay is not configured", 503));
    }

    const userId = req.user.userId;

    const cartItems = await Cart.find({ userId }).populate({
      path: "bookId",
      select: "title price",
    });

    const books = cartItems.filter((item) => item.bookId);
    if (books.length === 0) {
      return next(new AppError("Cart is empty", 400));
    }

    const amountRupees = books.reduce(
      (sum, item) => sum + (item.bookId.price || 0),
      0
    );
    if (amountRupees <= 0) {
      return next(new AppError("Invalid cart total", 400));
    }

    const amountPaise = Math.round(amountRupees * 100);
    const bookIds = books.map((item) => item.bookId._id);

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `cart_${userId}_${Date.now()}`,
      notes: {
        userId: userId.toString(),
      },
    });

    await Payment.create({
      userId,
      razorpayOrderId: order.id,
      bookIds,
      amount: amountPaise,
      currency: "INR",
      status: "created",
    });

    return res.status(201).json({
      orderId: order.id,
      amount: amountPaise,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      bookIds,
    });
  } catch (error) {
    next(error);
  }
};

/** Client UX only — verifies signature. Does NOT grant ownership. */
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(new AppError("Missing payment verification fields", 400));
    }

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
      userId: req.user.userId,
    });
    if (!payment) {
      return next(new AppError("Payment order not found", 404));
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return next(new AppError("Invalid payment signature", 400));
    }

    return res.status(200).json({
      verified: true,
      status: payment.status,
      orderId: payment.razorpayOrderId,
      message:
        payment.status === "paid"
          ? "Payment complete"
          : "Payment verified. Unlocking books shortly.",
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentStatus = async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      razorpayOrderId: req.params.orderId,
      userId: req.user.userId,
    }).select("razorpayOrderId status amount currency bookIds createdAt");

    if (!payment) {
      return next(new AppError("Payment order not found", 404));
    }

    return res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

/** Source of truth — Razorpay webhook with signature + idempotent fulfill. */
export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("RAZORPAY_WEBHOOK_SECRET is not set");
      return res.status(500).json({ message: "Webhook not configured" });
    }

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(typeof req.body === "string" ? req.body : JSON.stringify(req.body));

    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expected !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = JSON.parse(rawBody.toString("utf8"));
    const eventType = event.event;

    if (eventType === "payment.captured" || eventType === "order.paid") {
      const entity =
        event.payload?.payment?.entity || event.payload?.order?.entity;
      const razorpayOrderId =
        entity?.order_id || event.payload?.order?.entity?.id;
      const razorpayPaymentId =
        event.payload?.payment?.entity?.id || entity?.id;

      if (razorpayOrderId) {
        await fulfillPaidOrder({
          razorpayOrderId,
          razorpayPaymentId:
            eventType === "payment.captured" ? razorpayPaymentId : undefined,
        });
      }
    }

    if (eventType === "payment.failed") {
      const orderId = event.payload?.payment?.entity?.order_id;
      if (orderId) {
        await Payment.findOneAndUpdate(
          { razorpayOrderId: orderId, status: "created" },
          { status: "failed" }
        );
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return res.status(500).json({ message: "Webhook handler failed" });
  }
};
