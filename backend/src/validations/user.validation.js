const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    sortBy: Joi.string().optional(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      username: Joi.string(),
    })
    .min(1)
    .messages({
      "object.min": "Please provide data to update.",
    }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = { getUser, updateUser, deleteUser };
