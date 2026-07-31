import express from "express";
import {
  createUser,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  generateRefreshToken,
  logOut,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  authLimiter,
  passwordResetLimiter,
} from "../middlewares/rateLimiter.js";
import {
  loginValidationList,
  registerValidationList,
} from "../validators/authValidator.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();
// user registration
router.post(
  "/register",
  registerValidationList,
  validate,
  authLimiter,
  createUser,
);
router.post("/login", loginValidationList, validate, authLimiter, login);
router.post("/forgot-password", passwordResetLimiter, forgotPassword);
router.patch("/updateMyPassword", protectRoute, updatePassword);
router.patch("/reset-password/:token", resetPassword);
router.post("/refresh", generateRefreshToken);
router.post("/logout", protectRoute, logOut);

export default router;
