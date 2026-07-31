import { promisify } from "util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../config/db.js";
import {
  hashPassword,
  checkPassword,
  generatePasswordResetToken,
  signUpToken,
  createSendTokens,
  hasPasswordChanged,
} from "../services/authServices.js";
import AppError from "../utils/appError.js";
import sendEmail from "../utils/email.js";
import { catchAsync } from "../utils/catchAsyncError.js";

// user registration controller
export const createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  //check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    throw new AppError("user exists already with this Email", 409);
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  // create/register the user
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      passwordChangedAt: true,
      createdAt: true,
      role: true,
    },
  });

  //generate token and send response
  createSendTokens(newUser, 201, res);
});

//user login controller
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  //check if user exists && password correct
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || !(await checkPassword(password, user.password))) {
    throw new AppError("Incorrect Credentials", 401);
  }

  //3. all ok--> send access token to client
  createSendTokens(user, 200, res);
});

//password  reset
export const forgotPassword = async (req, res, next) => {
  //1. get the user with the email
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (!user) {
    return next(new AppError("User with this email does not exist", 404));
  }

  //2. generate the random reset token
  const { resetToken, hashedResetToken, passwordResetExpiresIn } =
    generatePasswordResetToken();
  //save hashedToken and expiryTime in DB
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordResetToken: hashedResetToken,
      passwordResetExpiresIn: new Date(passwordResetExpiresIn),
    },
  });

  //3. send unencrypted reset token to the user's email
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/forgot-password/${resetToken}`;
  //the above URL will be sent to client for password reset
  const subject = "Reset your Password";
  const message = `Reset your password using this link:\n\n${resetURL}\n\nThis link expires in 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: subject,
      message: message,
    });
    return res.status(200).json({
      status: "success",
      message: "Reset Link sent to user email",
    });
  } catch (error) {
    //things to do if error
    // user.passwordResetToken=undefined;
    // user.passwordResetExpiresIn=undefined;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: undefined,
        passwordResetExpiresIn: undefined,
      },
    });

    return res.status(500).json({
      status: "fail",
      message: "Error Sending Email. Try Again Later",
    });
  }
};
//
export const resetPassword = catchAsync(async (req, res) => {
  //1. find the user with the reset token hashed
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpiresIn: {
        gt: new Date(),
      },
    },
  });

  //2. if user exists and token hasn't expired, update password, passwordChangedAt
  if (!user) {
    return next(new AppError("Token has expired. Try Again", 400));
  }
  //update now
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hashPassword(req.body.password),
      passwordChangedAt: new Date(),
      passwordResetToken: null,
      passwordResetExpiresIn: null,
    },
  });

  //3.Log the user in and grant new jwt token and send to client
  createSendTokens(user, 200, res);
});

// update password
export const updatePassword = catchAsync(async (req, res, next) => {
  //1. get user from db
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  //2. check if POST-ed password is correct
  if (!(await checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your Current Password is Wrong. Try Again", 401));
  }
  //3. ok-->so, update the password
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hashPassword(req.body.password),
      passwordChangedAt: new Date(),
    },
  });

  //4.log the user in and send new jwt
  createSendToken(user, 200, res);
});

// refresh token controller
export const generateRefreshToken = catchAsync(async (req, res, next) => {
  //1) get the token
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new AppError("Please log in again to get access", 401);
  }
  //2) verify refresh token
  const decoded_payload = await promisify(jwt.verify)(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
  );
  //console.log(decoded_payload);
  //3) check if user still exists
  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded_payload.id,
    },
  });
  if (!currentUser) {
    throw new AppError("Please log in again", 401);
  }
  //4) check if password changed after refresh token was issued
  const changed = hasPasswordChanged(decoded_payload.iat, currentUser);
  if (changed) {
    throw new AppError("Password has Changed. Please log in again", 401);
  }

  //5) generate new access token
  const accessToken = jwt.sign({ id: currentUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  //6) return new access token
  return res.status(200).json({
    status: "success",
    data: {
      newAccessToken: accessToken,
    },
  });
});
//logout controller for now
export const logOut = catchAsync(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
