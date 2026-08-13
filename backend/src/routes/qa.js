import express from "express";
import authMiddleware from "../middleware/auth.js";
import { askBookQuestion } from "../controllers/qa.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", askBookQuestion);

export default router;
