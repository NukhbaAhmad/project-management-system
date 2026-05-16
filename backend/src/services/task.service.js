const { status: httpStatus } = require("http-status");
const { Task, Project } = require("#models");
const { ApiError, pick } = require("#utils");
const { taskHelpers } = require("#helpers");
const { filterParams } = require("#constants");

// Get tasks
const queryTasks = async (userId, query) => {
  const filter = { created_by: userId };
  if (query.project_id) filter.project_id = query.project_id;
  if (query.status) filter.status = query.status;
  if (query.is_trashed !== undefined)
    filter.is_trashed = query.is_trashed === "true";
  if (query.title) filter.title = { $regex: query.title, $options: "i" };

  const options = pick(query, filterParams.options);
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

// Create task
const createTask = async (userId, body) => {
  const { project_id, title, description, status } = body;
  await taskHelpers.validateProjectAccess(project_id, userId);
  const task = await Task.create({
    project_id,
    title,
    description,
    created_by: userId,
    status,
  });
  return task;
};

// Get single task by ID
const getTaskById = async (task_id, userId) => {
  const task = await Task.findOne({
    _id: task_id,
    created_by: userId,
  });
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Task not found.",
    });
  }
  return task;
};

// Update task
const updateTaskById = async (task_id, userId, updateBody) => {
  const task = await Task.findOne({ _id: task_id, created_by: userId });
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Task not found.",
    });
  }
  // Check: Project should not be trashed.
  const project = await Project.findById(task.project_id);
  if (project.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: `Restore the project ${project.title} first to update the task.`,
    });
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

// Delete task
const softDeleteTaskById = async (task_id, userId) => {
  const task = await Task.findOne({
    _id: task_id,
    created_by: userId,
  });
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Task not found.",
    });
  }
  if (task.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Task is already trashed.",
    });
  }
  task.is_trashed = true;
  await task.save();
  return task;
};

const restoreTaskById = async (task_id, userId) => {
  const task = await Task.findOne({
    _id: task_id,
    created_by: userId,
    is_trashed: true,
  });
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Trashed task not found.",
    });
  }
  if (!task.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Task already restored successfully.",
    });
  }
  task.is_trashed = false;
  await task.save();
  return task;
};
module.exports = {
  createTask,
  queryTasks,
  restoreTaskById,
  getTaskById,
  updateTaskById,
  softDeleteTaskById,
};
