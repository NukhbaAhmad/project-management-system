const Joi = require("joi");
const { password } = require("./custom.validation");

const registerUser = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    username: Joi.string().required().trim(),
    password: Joi.string().custom(password).required().trim(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    identifier: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  }),
};

module.exports = { loginUser, registerUser };
