import jwt from "jsonwebtoken";
import User from "../models/users.js";
const optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // No token → guest, continue
  if (!authHeader?.startsWith("Bearer ")) {
    return next();
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      // match how your controllers use it: req.user.userId
      req.user = { userId: user._id, ...user.toObject() };
    }
  } catch {
  // bad/expired token → treat as guest, don't 401
  }
  next();
};
export default optionalAuthMiddleware;