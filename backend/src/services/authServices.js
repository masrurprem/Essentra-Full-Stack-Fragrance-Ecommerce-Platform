// imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

//password hashing
export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, Number(process.env.SALT_ROUNDS));
};

//
export const checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
//
export const signUpToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//
export const createSendTokens = (user, statusCode, res) => {
  //generate access token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // generate refresh token
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  );

  // send refresh token to cookie
  const cookieOptions = {
    httpOnly: true,
    maxAge: 10 * 60 * 1000, //10m for testing::later will match token expiration time
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  //send response: access token to the user
  return res.status(statusCode).json({
    status: "success",
    accessToken: token,
  });
};
//

//
export const hasPasswordChanged = (token_iat, currentUser) => {
  if (currentUser.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10,
    );
    return token_iat < passwordChangedTime;
  }

  return false;
};

//
export const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
  return { resetToken, hashedResetToken, passwordResetExpiresIn };
};
