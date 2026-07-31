//imports
import { body } from "express-validator";
// auth-specific validation lists

export const registerValidationList = [
  body("name").trim().notEmpty().withMessage("You must provide a name."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address.")
    .normalizeEmail(),
  body("password")
    .isStrongPassword({
      minLength: 10,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
];
//

export const loginValidationList = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Provide valid email address.")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
];
