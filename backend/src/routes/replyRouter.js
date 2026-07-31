import express from "express";
import {
  createReply,
  updateReply,
  deleteReply,
} from "../controllers/replyController.js";
import { protectRoute, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

//review APIs
router.route("/review/:reviewId").post(protectRoute, createReply);

router
  .route("/:replyId")
  .patch(protectRoute, updateReply)
  .delete(protectRoute, restrictTo("USER", "ADMIN"), deleteReply);
export default router;
