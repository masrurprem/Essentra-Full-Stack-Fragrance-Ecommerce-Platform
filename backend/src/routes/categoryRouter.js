// imports
import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  get_Uncategorized_Products,
} from "../controllers/categoryController.js";
import { protectRoute, restrictTo } from "../middlewares/authMiddleware.js";
import { categoryLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// category APIs

router
  .route("/")
  .post(protectRoute, restrictTo("ADMIN"), categoryLimiter, createCategory)
  .get(protectRoute, restrictTo("ADMIN"), categoryLimiter, getAllCategories);
router.get(
  "/uncategorized-products",
  protectRoute,
  restrictTo("ADMIN"),
  categoryLimiter,
  get_Uncategorized_Products,
);
router
  .route("/:id")
  .get(protectRoute, restrictTo("ADMIN"), categoryLimiter, getCategoryById)
  .patch(protectRoute, restrictTo("ADMIN"), categoryLimiter, updateCategory)
  .delete(protectRoute, restrictTo("ADMIN"), categoryLimiter, deleteCategory);
export default router;
