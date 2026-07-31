import AppError from "../utils/appError.js";

//
const sendErrorDev = (res, err) => {
  // log to the console also
  console.log(err);
  res.status(err.statusCode).json({
    // as much details as possible
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
//
const sendErrorProd = (res, err) => {
  // operational errors: errors we know may happen at some point of time
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // for any unknown/untrusted errors: don't leak details
  else {
    // log for debugging
    console.log(err);

    // send generic msg to client
    res.status(500).json({
      status: "error",
      message: "Something Went Wrong..Oops!",
    });
  }
};
//
const prismaNotFoundErrorHandler = (er) => {
  const field = er.meta.modelName;
  const message = `No Such ${field} Found.`;
  return new AppError(message, 404);
};
//
const prismaNotUniqueErrorHandler = (er) => {
  const field = er.meta.target.join(", ");
  const message = `${field} already exists.`;
  return new AppError(message, 400);
};
//
const TokenExpiredErrorHandler = (er) => {
  const message = "Please log in to continue.";
  return new AppError(message, 401);
};
//
const JsonTokenErrorHandler = (er) => {
  const message = "Please log in to continue.";
  return new AppError(message, 401);
};

// the error handler Global
export const globalErrorHandler = (err, req, res, next) => {
  // log error to the console
  console.log(err);
  console.log("the message: ", err.message);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  //for development
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err);
  }
  // for production
  else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    //console.log("error after ..err", error);
    error.message = err.message;
    if (error.code === "P2025") {
      error = prismaNotFoundErrorHandler(error);
    }
    if (error.code === "P2002") {
      error = prismaNotUniqueErrorHandler(error);
    }
    if (error.name === "TokenExpiredError") {
      error = TokenExpiredErrorHandler(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = JsonTokenErrorHandler(error);
    }

    sendErrorProd(res, error);
  }
};
