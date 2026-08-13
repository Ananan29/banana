import jwt from "jsonwebtoken";
import User from "../models/users.js";
import AppError from "../utils/AppError.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Not authorized, no token", 401));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("Not authorized, user not found", 401));
    }

    req.user = { userId: user._id, ...user.toObject() };
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
