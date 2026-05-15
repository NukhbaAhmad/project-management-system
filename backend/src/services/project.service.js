const { status: httpStatus } = require("http-status");
const { Project } = require("#models");
const { filterParams } = require("#constants");
const { ApiError, pick, filter } = require("#utils");

const queryProjects = async (req) => {
  const filters = pick(req.query, filterParams.projects);
  filter.applyStringFilters(filters, filterParams.projects);
  if (req.query.is_trashed !== undefined) {
    filters.is_trashed = req.query.is_trashed === "true";
  }
  filters.createdBy = req.user.id;
  const options = pick(req.query, filterParams.options);
  const projects = await Project.paginate(filters, options);
  return projects;
};

const createProject = async (userId, body) => {
  if (await Project.isTitleTaken(body.title)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Title already exists.",
      isOperational: true,
    });
  }
  const project = await Project.create({ ...body, createdBy: userId });
  return project;
};

const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found.",
    });
  }
  return project;
};

const updateProjectById = async (projectId, userId, payload) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found.",
    });
  }
  if (await Project.isTitleTaken(payload.title)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Title already exists.",
      isOperational: true,
    });
  }
  Object.assign(project, payload);
  await project.save();
  return project;
};

const deleteProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found",
    });
  }
  if (project.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Project already trashed successfully.",
    });
  }

  // Soft delete
  project.is_trashed = true;
  await project.save();
  return project;
};

const restoreProjectById = async (projectId, userId) => {
  const project = await Project.findOne({
    _id: projectId,
    createdBy: userId,
    is_trashed: true,
  });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Trashed project not found.",
    });
  }
  if (!project.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Project already restored successfully.",
    });
  }
  project.is_trashed = false;
  await project.save();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  restoreProjectById,
};
