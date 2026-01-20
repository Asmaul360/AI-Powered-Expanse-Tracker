import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie or header
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("TOKEN 👉", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized: Token not provided");
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("DECODED 👉", decoded);

    // 3️⃣ Extract user id safely
    const userId = decoded._id || decoded.id || decoded.userId || decoded.sub;

    if (!userId) {
      throw new ApiError(401, "Invalid token payload (no user id)");
    }

    // 4️⃣ Find user
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // 5️⃣ Attach user & continue
    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH ERROR 👉", error.message);

    throw new ApiError(
      error.statusCode || 401,
      error.message || "Authentication failed"
    );
  }
});
