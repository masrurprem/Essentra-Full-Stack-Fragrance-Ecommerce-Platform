import express from "express";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protectRoute, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

//review APIs
router.route("/product/:productId").post(protectRoute, createReview);

router
  .route("/:reviewId")
  .patch(protectRoute, updateReview)
  .delete(protectRoute, restrictTo("USER", "ADMIN"), deleteReview);
export default router;
