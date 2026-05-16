const { status: httpStatus } = require("http-status");
const { projectServices } = require("#services");
const { catchAsync, sendResponse } = require("#utils");

const getProjects = catchAsync(async (req, res) => {
  const projects = await projectServices.queryProjects(req);
  sendResponse(res, httpStatus.OK, { data: projects });
});

const createProject = catchAsync(async (req, res) => {
  const project = await projectServices.createProject(req.user.id, req.body);
  sendResponse(res, httpStatus.CREATED, {
    message: "Project created successfully.",
    data: project,
  });
});

const getProject = catchAsync(async (req, res) => {
  const project = await projectServices.getProjectById(
    req.params.project_id,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, { data: project });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectServices.updateProjectById(
    req.params.project_id,
    req.user.id,
    req.body
  );
  sendResponse(res, httpStatus.OK, {
    message: "Project updated successfully.",
    data: project,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  await projectServices.softDeleteProjectById(
    req.params.project_id,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: "Project moved to trash successfully.",
  });
});

const restoreProject = catchAsync(async (req, res) => {
  const project = await projectServices.restoreProjectById(
    req.params.project_id,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: "Project restored successfully.",
    data: project,
  });
});
const restoreTasksByProject = catchAsync(async (req, res) => {
  const { project_id } = req.params;
  const result = await projectServices.restoreTasksByProjectId(
    project_id,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: result.message,
  });
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  restoreProject,
  restoreTasksByProject,
};
