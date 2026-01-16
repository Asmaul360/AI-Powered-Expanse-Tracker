import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Expense } from "../models/expense.model.js";
const createExpense = asyncHandler(async (req, res) => {
  const { amount, title, note, paymentMethod, date, isRecurring } = req.body;
  if (!title?.trim() || amount == null || !paymentMethod) {
    throw new ApiError(400, "Title, amount and payment method are required");
  }
  if (amount < 0) {
    throw new ApiError(400, "Amount cannot be negative");
  }
  const expense = await Expense.create({
    user: req.user?._id,
    amount,
    title,
    note,
    paymentMethod,
    date,
    isRecurring,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, expense, "Expense created successfully"));
});
const getExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findOne({
    user: req.user?._id,
    _id: expenseId,
  });
  if (!expense) {
    throw new ApiError(404, "Unauthorized access");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense fetched successfully"));
});
const updateExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const { amount, title, note, paymentMethod, isRecurring } = req.body;
  const expense = await Expense.findOneAndUpdate(
    {
      user: req.user?._id,
      _id: expenseId,
    },
    {
      $set: {
        amount,
        title,
        note,
        paymentMethod,
        isRecurring,
      },
    },
    { new: true }
  );
  if (!expense) {
    throw new ApiError(404, "Unauthorized access");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully"));
});
const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    user: req.user?._id,
  });
  if (!expense) {
    throw new ApiError(404, "Unauthorized access");
    s;
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Expense deleted successfully"));
});
const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "All expenses fetched successfully"));
});
