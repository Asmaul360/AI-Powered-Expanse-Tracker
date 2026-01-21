import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
  getBudgetSummary,
} from "../controllers/budget.controller.js";

const router = Router();
router.post("/create-budget", verifyJWT, createBudget);
router.get("/getBudget/:budgetId", verifyJWT, getBudget);
router.patch("/updateBudget/:budgetId", verifyJWT, updateBudget);
router.delete("/deleteBudget/:budgetId", verifyJWT, deleteBudget);
router.get("/summary/:budgetId", verifyJWT, getBudgetSummary);

export default router;
