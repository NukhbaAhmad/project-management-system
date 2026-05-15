const express = require("express");
const { auth, validateSchema } = require("#middlewares");
const { userValidation } = require("#validations");
const { userController } = require("#controllers");

const router = express.Router();

router.route("/").get(userController.getUsers);

router
  .route("/:userId")
  .get(
    auth(),
    validateSchema(userValidation.getUser),
    userController.getUserById
  )
  .patch(
    auth(),
    validateSchema(userValidation.updateUser),
    userController.updateUserById
  )
  .delete(
    auth(),
    validateSchema(userValidation.deleteUser),
    userController.deleteUser
  );

module.exports = router;
