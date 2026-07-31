import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  //check for validation errors
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: validationErrors.array(),
    });
  }
  // all ok:: proceed to registar controller
  next();
};
