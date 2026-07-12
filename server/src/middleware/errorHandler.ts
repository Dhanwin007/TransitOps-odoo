import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message:
      err instanceof Error
        ? err.message
        : "Internal server error",
  });
};

export default errorHandler;