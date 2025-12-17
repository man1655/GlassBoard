import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Check token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Get user
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User no longer exists",
        });
      }

      if (user.status === "banned") {
        return res.status(403).json({
          success: false,
          message: "Your account has been banned",
        });
      }

      req.user = user;
      return next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token invalid",
      });
    }
  }

  // 5️⃣ No token
  return res.status(401).json({
    success: false,
    message: "Not authorized, no token",
  });
};
