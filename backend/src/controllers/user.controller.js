const { status: httpStatus } = require("http-status");
const { userServices } = require("#services");
const { catchAsync, sendResponse } = require("#utils");

const getUsers = catchAsync(async (req, res, next) => {
  const users = await userServices.queryUsers(req);
  sendResponse(res, httpStatus.OK, { data: users });
});

const getUserById = catchAsync(async (req, res, next) => {
  const user = await userServices.getUserById(req.params.userId);
  sendResponse(res, httpStatus.OK, { data: user });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const user = await userServices.updateUserById(
    req.params.userId,
    req.body,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: "User updated successfully",
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  await userServices.deleteUser(req.params.userId, req.user.id);
  sendResponse(res, httpStatus.OK, { message: "User deleted successfully." });
});

module.exports = {
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
