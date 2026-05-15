const express = require("express");
const { auth, validateSchema } = require("#middlewares");
const { taskValidation } = require("#validations");
const { taskController } = require("#controllers");

const router = express.Router();
router.use(auth());

router
  .route("/")
  .post(validateSchema(taskValidation.createTask), taskController.createTask)
  .get(validateSchema(taskValidation.getTasks), taskController.getTasks);

router
  .route("/:taskId")
  .get(validateSchema(taskValidation.getTask), taskController.getTask)
  .patch(validateSchema(taskValidation.updateTask), taskController.updateTask)
  .delete(validateSchema(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;
