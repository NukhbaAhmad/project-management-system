const { status: httpStatus } = require("http-status");
const { User } = require("#models");
const { ApiError } = require("#utils");
const { authHelpers } = require("#helpers");
const { sendResponse } = require("#utils");
const { tokenHelpers } = require("#helpers");
const { tokenTypes } = require("#constants");
const { envConfig } = require("#config");

const registerUser = async (req) => {
  const payload = req.body;
  if (await User.isEmailTaken(payload.email)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Email is already taken",
      isOperational: true,
    });
  }
  if (await User.isUsernameTaken(payload.username)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Username is already taken",
      isOperational: true,
    });
  }
  const user = await User.create(payload);
  const access_token = tokenHelpers.generateToken(user._id);

  return {
    user,
    access_token,
    message: "User created successfully.",
  };
};

const loginUser = async (req) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError({
      statusCode: httpStatus.UNAUTHORIZED,
      message: "No user found. Incorrect email/username or password",
    });
  }

  const access_token = tokenHelpers.generateToken(user._id);
  return { user, access_token, message: "Login successful." };
};

module.exports = { registerUser, loginUser };
