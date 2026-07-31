//imports
import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getMyCart,
  clearCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";
import {
  cartReadLimiter,
  cartWriteLimiter,
} from "../middlewares/rateLimiter.js";

const router = express.Router();

//Cart APIs
router
  .route("/")
  .post(protectRoute, cartWriteLimiter, addToCart)
  .get(protectRoute, cartReadLimiter, getMyCart)
  .delete(protectRoute, cartWriteLimiter, clearCart);

router
  .route("/:productId")
  .patch(protectRoute, cartWriteLimiter, updateCartItem)
  .delete(protectRoute, cartWriteLimiter, removeCartItem);

export default router;
