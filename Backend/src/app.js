import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import category from "./routes/category.routes.js";
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Route declarations
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/expense", expenseRoutes); // All expense APIs
app.use("/api/v1/category", category);
export default app;
