const { status: httpStatus } = require("http-status");
const { taskServices } = require("#services");
const { catchAsync, sendResponse } = require("#utils");

const createTask = catchAsync(async (req, res) => {
  const task = await taskServices.createTask(req.user.id, req.body);
  sendResponse(res, httpStatus.CREATED, {
    message: "Task created successfully.",
    data: task,
  });
});

const getTasks = catchAsync(async (req, res) => {
  const tasks = await taskServices.queryTasks(req.user.id, req.query);
  sendResponse(res, httpStatus.OK, { data: tasks });
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskServices.getTaskById(req.params.task_id, req.user.id);
  sendResponse(res, httpStatus.OK, { data: task });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskServices.updateTaskById(
    req.params.task_id,
    req.user.id,
    req.body
  );
  sendResponse(res, httpStatus.OK, {
    message: "Task updated successfully.",
    data: task,
  });
});

const softDeleteTask = catchAsync(async (req, res) => {
  const task = await taskServices.softDeleteTaskById(
    req.params.task_id,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: "Task moved to trash successfully.",
  });
});

const restoreTask = catchAsync(async (req, res) => {
  const task = await taskServices.restoreTaskById(
    req.params.task_id,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: "Task restored successfully.",
    data: task,
  });
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  softDeleteTask,
  restoreTask,
};
