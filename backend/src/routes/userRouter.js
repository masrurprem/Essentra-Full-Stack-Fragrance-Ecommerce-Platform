import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateMe,
} from "../controllers/userController.js";
import { protectRoute, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// current user routes
router.patch("/updateMe", protectRoute, updateMe);

//admin only user routes
router.get("/", protectRoute, restrictTo("ADMIN"), getAllUsers);
router
  .route("/:id")
  .get(getUserById)
  .delete(protectRoute, restrictTo("ADMIN"), deleteUser);
// post and patch are yet to be defined for admin

export default router;
