import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

//import routers
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import replyRouter from "./routes/replyRouter.js";
// import rate limiters
import { userApiLimiter, authLimiter } from "./middlewares/rateLimiter.js";
//
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import AppError from "./utils/appError.js";

const app = express();

//middlewares

// serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//Body-Parser, for reading data from body into req.body
app.use(express.json({ limit: "30kb" }));
//cookie-parser
app.use(cookieParser());
// prevent http parameter pollution
app.use(hpp());
// hpp testing middleware
// app.use((req, res, next) => {
//   console.log("after hpp query state: ", req.query);
//   next();
// });
//http req logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// for security http headers
app.use(helmet());

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//api routes
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", userApiLimiter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/reply", replyRouter);
//handling unhandled routes
app.all("/*splat", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});
// global error handling middleware
app.use(globalErrorHandler);
// export
export default app;
