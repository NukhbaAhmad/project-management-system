const { status: httpStatus } = require("http-status");
const { User } = require("#models");
const { filterParams } = require("#constants");
const { ApiError, pick, filter } = require("#utils");

const queryUsers = async (req) => {
  const filters = pick(req.query, filterParams.users);
  filter.applyStringFilters(filters, filterParams.users);
  const options = pick(req.query, filterParams.options);
  return await User.paginate(filters, options);
};

const updateUserById = async (id, body) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found.`",
    });
  }
  if (body.email && (await User.isEmailTaken(body.email, id))) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Email is already taken.",
      isOperational: true,
    });
  }
  if (body.username && (await User.isUsernameTaken(body.username, id))) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Username is already taken.",
      isOperational: true,
    });
  }
  Object.assign(user, body);
  await user.save();
  return { message: "User updated successfully.", user };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found.",
    });
  }
  return user;
};

const deleteUser = async (userId, currentUserId) => {
  if (userId !== currentUserId) {
    throw new ApiError({
      statusCode: httpStatus.FORBIDDEN,
      message: "Unauthorized. Failed to delete user.",
    });
  }

  const user = await User.deleteOne({ _id: userId });

  if (!user) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found",
    });
  }
  return user;
};
module.exports = {
  queryUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
