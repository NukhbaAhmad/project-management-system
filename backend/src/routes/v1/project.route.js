const express = require("express");
const { auth, validateSchema } = require("#middlewares");
const { projectValidation } = require("#validations");
const { projectController } = require("#controllers");

const router = express.Router();

router.use(auth());

// Create project & Get all projects
router
  .route("/")
  .get(
    validateSchema(projectValidation.getProjects),
    projectController.getProjects
  )
  .post(
    validateSchema(projectValidation.createProject),
    projectController.createProject
  );

// Get, update, delete (soft delete), restore
router
  .route("/:project_id")
  .get(
    validateSchema(projectValidation.getProject),
    projectController.getProject
  )
  .patch(
    validateSchema(projectValidation.updateProject),
    projectController.updateProject
  )
  .delete(
    validateSchema(projectValidation.deleteProject),
    projectController.deleteProject
  );

// Restore a trashed project
router.patch(
  "/:project_id/restore",
  validateSchema(projectValidation.restoreProject),
  projectController.restoreProject
);

// Restore all tasks of a project
router.patch(
  "/:project_id/restore-tasks",
  validateSchema(projectValidation.restoreProjectTasks),
  projectController.restoreTasksByProject
);

module.exports = router;
