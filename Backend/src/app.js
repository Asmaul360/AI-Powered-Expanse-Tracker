import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import categoryRoutes from "./routes/category.routes.js";

import budgetRouter from "./routes/budget.routes.js"; // Adjust path as needed

const app = express();

// MIDDLEWARES
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/category", categoryRoutes);

export default app;
