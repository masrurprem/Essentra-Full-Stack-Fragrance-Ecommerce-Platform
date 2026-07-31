import { promisify } from "util";
import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import { hasPasswordChanged } from "../services/authServices.js";
import { catchAsync } from "../utils/catchAsyncError.js";
import AppError from "../utils/appError.js";

export const protectRoute = catchAsync(async (req, res, next) => {
  //1. get token and check if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Please log in again to get access", 401);
  }

  //2. token verification
  const decoded_payload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );
  //console.log(decoded_payload);

  //3. check if user still exists
  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded_payload.id,
    },
  });
  if (!currentUser) {
    throw new AppError("Please log in again", 401);
  }

  //4.check if user changed password after token was given
  const changed = hasPasswordChanged(decoded_payload.iat, currentUser);
  if (changed) {
    throw new AppError("Password has Changed. Please log in again", 401);
  }

  // finally all OK .. proceed
  req.user = currentUser;
  next();
});

// role middleware
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "Restricted Access",
      });
    }

    next();
  };
};
