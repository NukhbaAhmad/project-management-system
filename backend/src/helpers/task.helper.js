const httpStatus = require("http-status");
const { Task, Project } = require("#models");
const { ApiError } = require("#utils");

const validateProjectAccess = async (
  project_id,
  userId,
  allowTrashed = false
) => {
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
  if (!allowTrashed && project.is_trashed) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Cannot update tasks of a trashed project.",
    });
  }
  return project;
};

module.exports = { validateProjectAccess };
