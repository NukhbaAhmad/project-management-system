const { status: httpStatus } = require("http-status");
const { Task, Project } = require("#models");
const { ApiError, pick } = require("#utils");

// Helper: ensure project exists and user owns it (optionally allow trashed)
const validateProjectAccess = async (
  projectId,
  userId,
  allowTrashed = false
) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found",
    });
  }
  if (!allowTrashed && project.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Cannot modify tasks of a trashed project",
    });
  }
  return project;
};

// Create task
const createTask = async (userId, body) => {
  const { projectId, title, status } = body;
  await validateProjectAccess(projectId, userId);
  const task = await Task.create({ projectId, title, status });
  return task;
};

// Get tasks by user (across projects) with filters
const queryTasks = async (userId, query) => {
  // First get all project IDs owned by the user
  const projects = await Project.find({ createdBy: userId }).select("_id");
  const projectIds = projects.map((p) => p._id);
  if (projectIds.length === 0) {
    return { results: [], page: 1, limit: 10, totalPages: 0, totalResults: 0 };
  }

  const filter = { projectId: { $in: projectIds } };
  // Optional filters
  if (query.projectId) {
    if (!projectIds.some((id) => id.toString() === query.projectId)) {
      throw new ApiError({
        statusCode: httpStatus.FORBIDDEN,
        message: "Access denied to this project",
      });
    }
    filter.projectId = query.projectId;
  }
  if (query.status) filter.status = query.status;
  if (query.is_trashed !== undefined)
    filter.is_trashed = query.is_trashed === "true";
  if (query.title) {
    filter.title = { $regex: query.title, $options: "i" };
  }

  const options = pick(query, ["limit", "page", "sortBy"]);
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

// Get single task by ID (with ownership check)
const getTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate("projectId");
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Task not found",
    });
  }
  if (task.projectId.createdBy.toString() !== userId) {
    throw new ApiError({
      statusCode: httpStatus.FORBIDDEN,
      message: "Access denied",
    });
  }
  return task;
};

// Update task (title, status) – only if project not trashed (or allow update if task is trashed? we'll allow only if project not trashed)
const updateTaskById = async (taskId, userId, updateBody) => {
  const task = await Task.findById(taskId).populate("projectId");
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Task not found",
    });
  }
  if (task.projectId.createdBy.toString() !== userId) {
    throw new ApiError({
      statusCode: httpStatus.FORBIDDEN,
      message: "Access denied",
    });
  }
  if (task.projectId.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Cannot update tasks of a trashed project",
    });
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

// Hard delete task – even if project trashed, but we allow
const deleteTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate("projectId");
  if (!task) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Task not found",
    });
  }
  if (task.projectId.createdBy.toString() !== userId) {
    throw new ApiError({
      statusCode: httpStatus.FORBIDDEN,
      message: "Access denied",
    });
  }
  await Task.findByIdAndDelete(taskId);
  return { success: true };
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
