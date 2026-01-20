import { Router } from "express";
import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  deleteAllCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/createCategory", verifyJWT, createCategory);
router.get("/getAllCategory", verifyJWT, getAllCategory);
router.get("/getCategory/:categoryId", verifyJWT, getCategory);
router.patch("/updateCategory/:categoryId", verifyJWT, updateCategory);
router.delete("/deleteCategory/:categoryId", verifyJWT, deleteCategory);
router.delete("/deleteAllCategory", verifyJWT, deleteAllCategory);

export default router;
