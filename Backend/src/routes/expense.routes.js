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

router.post("/create-expense", verifyJWT, createExpense);
router.get("/getExpense/:expenseId", verifyJWT, getExpense);
router.patch("/updateExpense/:expenseId", verifyJWT, updateExpense);
router.delete("/deleteExpense/:expenseId", verifyJWT, deleteExpense);

router.get("/getAllExpense", verifyJWT, getAllExpenses);

export default router;
