import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
  try {
    // ✅ First, try reading token from cookies
    let token = req.cookies?.accessToken;

    // ❓ If not in cookies → try Authorization header
    if (!token) {
      const authHeader = req.header("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized: No token provided");
      }
      token = authHeader.replace("Bearer ", "");
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user
    const user = await User.findById(decoded._id).select("-password");
    if (!user) throw new ApiError(401, "User not found");

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
