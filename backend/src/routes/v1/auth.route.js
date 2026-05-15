const express = require("express");
const { validateSchema } = require("#middlewares");
const { authValidation } = require("#validations");
const { authController } = require("#controllers");

const router = express.Router();
router.post(
  "/register",
  validateSchema(authValidation.registerUser),
  authController.register
);
router.post(
  "/login",
  validateSchema(authValidation.loginUser),
  authController.login
);

module.exports = router;
