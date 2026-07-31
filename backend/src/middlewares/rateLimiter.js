import { rateLimit } from "express-rate-limit";

// limiter for general api requests
export const userApiLimiter = rateLimit({
  limit: 500, // depends on application
  windowMs: 60 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 1 Hour.",
    });
  },
});

// limiter for auth api requests
export const authLimiter = rateLimit({
  limit: 5,
  windowMs: 10 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 10 Minutes.",
    });
  },
});

// limiter for auth forgot password request
export const passwordResetLimiter = rateLimit({
  limit: 3,
  windowMs: 10 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 10 Minutes.",
    });
  },
});

// custom rate limiters for product APIs:

// limiter for product GET requests
export const getProductLimiter = rateLimit({
  limit: 1000,
  windowMs: 60 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 1 Hour.",
    });
  },
});

// limiter for product POST PATCH DELETE requests
export const updateProductLimiter = rateLimit({
  limit: 200,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

// Rate limiters for category APIs:
export const categoryLimiter = rateLimit({
  limit: 500,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

// rate limiters for cart APIs
export const cartWriteLimiter = rateLimit({
  limit: 100,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

export const cartReadLimiter = rateLimit({
  limit: 400,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

// rate limiters for order APIs
// for users
export const orderCreateLimiter = rateLimit({
  limit: 10,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

export const orderReadLimiter = rateLimit({
  limit: 100,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

export const orderCancelLimiter = rateLimit({
  limit: 5,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});

// for admin
export const orderLimiterAdmin = rateLimit({
  limit: 1000,
  windowMs: 30 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too Many Attempts. Try Again After 30 Minutes.",
    });
  },
});
