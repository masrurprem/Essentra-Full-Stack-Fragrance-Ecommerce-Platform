import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  uploadProductImageMiddleware,
  uploadImageController,
} from "../controllers/productController.js";
import { protectRoute, restrictTo } from "../middlewares/authMiddleware.js";
import {
  updateProductLimiter,
  getProductLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

//product APIs
router
  .route("/")
  .post(protectRoute, restrictTo("ADMIN"), updateProductLimiter, createProduct)
  .get(getProductLimiter, getAllProducts);
router.get("/:slug", getProductLimiter, getProductBySlug);
router
  .route("/:id")
  .patch(protectRoute, restrictTo("ADMIN"), updateProductLimiter, updateProduct)
  .delete(
    protectRoute,
    restrictTo("ADMIN"),
    updateProductLimiter,
    deleteProduct,
  );
router.patch(
  "/:id/image",
  protectRoute,
  restrictTo("ADMIN"),
  updateProductLimiter,
  uploadProductImageMiddleware,
  uploadImageController,
);

export default router;
