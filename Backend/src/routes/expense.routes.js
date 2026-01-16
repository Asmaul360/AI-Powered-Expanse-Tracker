import { Router } from "express";
import {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/expense", verifyJWT, createExpense);
router.get("/expense/:expenseId", verifyJWT, getExpense);
router.patch("/expense/:expenseId", verifyJWT, updateExpense);
router.delete("/expense/:expenseId", verifyJWT, deleteExpense);

router.get("/expenses", verifyJWT, getAllExpenses);

export default router;
