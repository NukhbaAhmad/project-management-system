const userValidation = require("./user.validation");
const customValidation = require("./custom.validation");
const authValidation = require("./auth.validation");
const projectValidation = require("./project.validation");
const taskValidation = require("./task.validation");

module.exports = {
  userValidation,
  customValidation,
  authValidation,
  taskValidation,
  projectValidation,
};
