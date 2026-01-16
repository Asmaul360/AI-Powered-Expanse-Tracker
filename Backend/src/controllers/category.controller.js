import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Category } from "../models/category.model.js";
const createCategory = asyncHandler(async (req, res) => {
  const { name, type, icon, color, description, isDefault } = req.body;
  if (!name?.trim() || !type?.trim() || !icon || !color) {
    throw new ApiError(400, "All fields are required");
  }
  const category = await Category.create({
    user: req.user?._id,
    name,
    type,
    icon,
    color,
    description,
    isDefault,
  });
  if (!category) {
    throw new ApiError(404, "Unauthorized access");
  }
  return res
    .status(201)
    .json(
      new ApiError(201, category, "Category has been created successfully")
    );
});
const getCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findOne({
    _id: categoryId,
    user: req.user?._id,
  });
  if (!category) {
    throw new ApiError(400, "Category not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, type, icon, color, description, isDefault } = req.body;
  const category = await Category.findOneAndUpdate(
    {
      _id: categoryId,
      user: req.user?._id,
    },
    { $set: { name, type, icon, color, description, isDefault } },
    { new: true }
  );
  if (!category) {
    throw new ApiError(404, "Category not found or unauthorized");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findOneAndDelete({
    _id: categoryId,
    user: req.user?._id,
  });
  if (!category) {
    throw new ApiError(404, "Category not found or unauthorized");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully"));
});
const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find({ user: req.user?._id });
  if (!category) {
    throw new ApiError(
      404,
      "Unauthorized access or Unable to get all category"
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        category,
        "All Category has been fetched successfully"
      )
    );
});
const deleteAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.deleteMany({ user: req.user._id });

  if (category.deletedCount === 0) {
    throw new ApiError(404, "No categories found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All categories deleted successfully"));
});
