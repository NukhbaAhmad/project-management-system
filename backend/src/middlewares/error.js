const mongoose = require("mongoose");
const { status: httpStatus } = require("http-status");
const { ApiError } = require("#utils");
const { envConfig } = require("#config");
const { generalHelpers } = require("#helpers");
const { errorLabels } = require("#constants");

const formatMongooseError = (err) => {
  if (err instanceof mongoose.Error.CastError) {
    const fieldName = err.path === "_id" ? "id" : err.path.toLowerCase();
    return `Invalid ${fieldName}.`;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return Object.values(err.errors).map((el) => {
      const rawField = errorLabels[el.path] || el.path;

      //  Capitalize message
      const formattedMessage = el.message.replace(
        el.path,
        generalHelpers.capitalize(rawField)
      );

      return {
        field: generalHelpers.lowerCase(rawField),
        message: generalHelpers.capitalize(formattedMessage),
      };
    });
  }

  return err.message;
};
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      err.statusCode ||
      (err instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR);

    let message = error.message || httpStatus[statusCode];
    let errors = null;
    if (error instanceof mongoose.Error) {
      const formatted = formatMongooseError(error);
      if (Array.isArray(formatted)) {
        errors = formatted;
        message = "Validation Error";
      } else {
        message = formatted;
        errors = null;
      }
    }
    error = new ApiError({
      statusCode,
      message,
      isOperational: error.isOperational || false,
      stack: err.stack,
      errors,
    });
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // const message = statusCode === 500 ? "Internal Server Error" : err.message;

  const { errors } = err;

  res.locals.errorMessage = message;

  const response = {
    status: statusCode,
    message,
    ...(errors && { errors }),
  };
  if (envConfig.port.env === "development") {
    console.log("Response Error:", response);
  }
  res.status(statusCode).send(response);
};
module.exports = { errorHandler, errorConverter };
