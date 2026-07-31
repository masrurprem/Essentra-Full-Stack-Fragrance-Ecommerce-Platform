import express from "express";
const router = express.Router();
import { protectRoute, restrictTo } from "../middlewares/authMiddleware.js";

import {
  createMyOrder,
  getMyOrderAll,
  cancelMyOrder,
  getMyOrderDetails,
  trackMyOrder,
  getOrderAdmin,
  updateOrderAdmin,
  getOrderAllAdmin,
} from "../controllers/orderController.js";
import {
  orderCreateLimiter,
  orderReadLimiter,
  orderLimiterAdmin,
  orderCancelLimiter,
} from "../middlewares/rateLimiter.js";

//order APIs
// 1) for users and //2) for admins
router
  .route("/")
  .post(protectRoute, orderCreateLimiter, createMyOrder)
  .get(protectRoute, orderReadLimiter, getMyOrderAll);
router.post("/track", protectRoute, orderReadLimiter, trackMyOrder);
router.get(
  "/admin",
  protectRoute,
  restrictTo("ADMIN"),
  orderLimiterAdmin,
  getOrderAllAdmin,
);
//
router.get("/:id", protectRoute, orderReadLimiter, getMyOrderDetails);
router.patch("/:id/cancel", protectRoute, orderCancelLimiter, cancelMyOrder);
router
  .route("/:id/admin")
  .get(protectRoute, restrictTo("ADMIN"), orderLimiterAdmin, getOrderAdmin)
  .patch(
    protectRoute,
    restrictTo("ADMIN"),
    orderLimiterAdmin,
    updateOrderAdmin,
  );

export default router;
