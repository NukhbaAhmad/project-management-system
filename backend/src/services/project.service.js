const { status: httpStatus } = require("http-status");
const { Project, Task } = require("#models");
const { filterParams } = require("#constants");
const { ApiError, pick, filter } = require("#utils");

const queryProjects = async (req) => {
  const filters = pick(req.query, filterParams.projects);
  filter.applyStringFilters(filters, filterParams.projects);
  if (req.query.is_trashed !== undefined) {
    filters.is_trashed = req.query.is_trashed === "true";
  }
  filters.created_by = req.user.id;
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
  const project = await Project.create({ ...body, created_by: userId });
  return project;
};

const getProjectById = async (project_id, userId) => {
  const project = await Project.findOne({
    _id: project_id,
    created_by: userId,
  });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found.",
    });
  }
  return project;
};

const updateProjectById = async (project_id, userId, payload) => {
  const project = await Project.findOne({
    _id: project_id,
    created_by: userId,
  });
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

const softDeleteProjectById = async (project_id, userId) => {
  const project = await Project.findOne({
    _id: project_id,
    created_by: userId,
  });
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

const restoreProjectById = async (project_id, userId) => {
  const project = await Project.findOne({
    _id: project_id,
    created_by: userId,
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
const restoreTasksByProjectId = async (project_id, userId) => {
  const project = await Project.findOne({
    _id: project_id,
    created_by: userId,
  });
  if (!project) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: "Project not found.",
    });
  }
  if (project.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: `Cannot restore tasks of a trashed project. Restore the %{project.title} project first. `,
    });
  }

  // No Trashed Tasks found.
  const trashedCount = await Task.countDocuments({
    project_id,
    is_trashed: true,
    created_by: userId,
  });
  if (trashedCount === 0) {
    return {
      projectTitle: project.title,
      restoredCount: 0,
      message: `No trashed tasks found for this ${project.title}.`,
    };
  }

  const result = await Task.updateMany(
    { project_id, is_trashed: true, created_by: userId },
    { is_trashed: false }
  );
  return {
    projectTitle: project.title,
    restoredCount: result.modifiedCount,
    message: `${project.title}'s ${result.modifiedCount} task(s) restored successfully.`,
  };
};
module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  softDeleteProjectById,
  restoreProjectById,
  restoreTasksByProjectId,
};
