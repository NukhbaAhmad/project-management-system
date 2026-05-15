const { sendResponse } = require("#utils");
const { authServices } = require("#services");
const { status: httpStatus } = require("http-status");
const { catchAsync } = require("#utils");
const register = catchAsync(async (req, res,next) => {
  const { user, access_token, message } = await authServices.registerUser(req);
  sendResponse(res, httpStatus.CREATED, {
    message,
    data: { user, access_token },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { user, access_token, message } = await authServices.loginUser(req);
  sendResponse(res, httpStatus.OK, { message, data: { user, access_token } });
});

const logout = catchAsync(async (req, res, next) => {
  sendResponse(res, httpStatus.OK, { message: "Logged out successfully" });
});

module.exports = { register, login, logout };
