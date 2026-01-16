import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Budget } from "../models/budget.model.js";
import { Expense } from "../models/expense.model.js";
const createBudget = asyncHandler(async (req, res) => {
  const {
    title,
    totalAmount,
    minimumLimit,
    maximumLimit,
    startDate,
    endDate,
    description,
    date,
  } = req.body;
  if (
    !title?.trim() ||
    !description?.trim() ||
    totalAmount == null ||
    minimumLimit == null ||
    maximumLimit == null ||
    !startDate ||
    !endDate ||
    !date
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (totalAmount < 0 || minimumLimit < 0 || maximumLimit < 0) {
    throw new ApiError(400, "Amount cannot be negative");
  }
  if (minimumLimit > maximumLimit) {
    throw new ApiError(400, "Minimum limit cannot exceed than Maximum limit");
  }
  const budget = await Budget.create({
    title,
    totalAmount,
    minimumLimit,
    maximumLimit,
    startDate,
    endDate,
    description,
    date,
    user: req.user?._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, budget, "BudgetCreated successfully"));
});
const getBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;

  const budget = await Budget.findOne({
    _id: budgetId, // specific budget
    user: req.user._id, // ensure it's the logged-in user's budget
  });
  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget fetched successfully"));
});
const updateBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;
  const {
    title,
    totalAmount,
    minimumLimit,
    maximumLimit,
    startDate,
    endDate,
    description,
  } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { _id: budgetId, user: req.user?._id },
    {
      $set: {
        title,
        totalAmount,
        minimumLimit,
        maximumLimit,
        startDate,
        endDate,
        description,
      },
    },
    { new: true }
  );
  if (!budget) {
    throw new ApiError(404, "Unable to update budget");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget updated successfully"));
});
const deleteBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;

  const budget = await Budget.findOneAndDelete({
    _id: budgetId,
    user: req.user._id, // ensure logged-in user owns the budget
  });

  if (!budget) {
    throw new ApiError(404, "Budget not found or not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Budget deleted successfully"));
});
export const getBudgetSummary = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;

  // 1. Fetch budget (only user's own)
  const budget = await Budget.findOne({
    _id: budgetId,
    user: req.user._id,
  });

  if (!budget) {
    throw new ApiError(404, "Budget not found or unauthorized");
  }

  // 2. Fetch all expenses inside this budget's date range
  const expenses = await Expense.find({
    user: req.user._id,
    date: {
      $gte: budget.startDate,
      $lte: budget.endDate,
    },
  });

  // 3. Calculate total spent
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // 4. Calculate remaining
  const remaining = budget.totalAmount - totalSpent;

  // 5. Overbudget check
  const overBudget = remaining < 0;

  // 6. Response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        budgetId: budget._id,
        title: budget.title,
        totalBudget: budget.totalAmount,
        minimumLimit: budget.minimumLimit,
        maximumLimit: budget.maximumLimit,
        totalSpent,
        remaining,
        overBudget,
        expenses, // (optional: frontend use karega)
      },
      "Budget summary calculated successfully"
    )
  );
});
