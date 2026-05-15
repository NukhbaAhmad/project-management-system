const { status: httpStatus } = require("http-status");
const { taskService } = require("#services");
const { catchAsync, sendResponse } = require("#utils");

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);
  sendResponse(res, httpStatus.CREATED, {
    message: "Task created",
    data: task,
  });
});

const getTasks = catchAsync(async (req, res) => {
  const tasks = await taskService.queryTasks(req.user.id, req.query);
  sendResponse(res, httpStatus.OK, { data: tasks });
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId, req.user.id);
  sendResponse(res, httpStatus.OK, { data: task });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(
    req.params.taskId,
    req.user.id,
    req.body
  );
  sendResponse(res, httpStatus.OK, { message: "Task updated", data: task });
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId, req.user.id);
  sendResponse(res, httpStatus.OK, { message: "Task deleted" });
});

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
