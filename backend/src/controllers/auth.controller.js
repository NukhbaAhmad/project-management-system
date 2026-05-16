const { sendResponse } = require("#utils");
const { authServices } = require("#services");
const { status: httpStatus } = require("http-status");
const { catchAsync } = require("#utils");
const register = catchAsync(async (req, res) => {
  const { user, access_token, message } = await authServices.registerUser(req);
  sendResponse(res, httpStatus.CREATED, {
    message: "User created successfully.",
    data: { user, access_token },
  });
});

const login = catchAsync(async (req, res) => {
  const { user, access_token, message } = await authServices.loginUser(req);
  sendResponse(res, httpStatus.OK, {
    message: "User logged in successfully.",
    data: { user, access_token },
  });
});

module.exports = { register, login };
