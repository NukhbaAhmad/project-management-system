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
    req.params.projectId,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, { data: project });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectServices.updateProjectById(
    req.params.projectId,
    req.user.id,
    req.body
  );
  sendResponse(res, httpStatus.OK, {
    message: "Project updated successfully.",
    data: project,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  await projectServices.deleteProjectById(req.params.projectId, req.user.id);
  sendResponse(res, httpStatus.OK, {
    message: "Project moved to trash successfully.",
  });
});

const restoreProject = catchAsync(async (req, res) => {
  const project = await projectServices.restoreProjectById(
    req.params.projectId,
    req.user.id
  );
  sendResponse(res, httpStatus.OK, {
    message: "Project restored successfully.",
    data: project,
  });
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  restoreProject,
};
