const passport = require("passport");
const { status: httpStatus } = require("http-status");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || !user) {
    let message = "Please log in first to continue.";

    if (info instanceof Error) {
      if (info.name === "TokenExpiredError") {
        message = "Your session has expired. Please log in again.";
      } else if (info.name === "JsonWebTokenError") {
        message = "Invalid token. Please log in again.";
      } else {
        message = info.message;
      }
    } else if (info && info.message === "No auth token") {
      message = "No authentication token found. Please provide a token.";
    } else if (!info && !user) {
      message = "Authentication required. Please log in.";
    }

    const { ApiError } = require("#utils");

    return reject(
      new ApiError({
        statusCode: httpStatus.UNAUTHORIZED,
        message: message,
        isOperational: true,
      })
    );
  }

  req.user = user;
  resolve();
};
const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
