const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTask = {
  body: Joi.object().keys({
    project_id: Joi.string().custom(objectId).required(),
    title: Joi.string().required().trim(),
    description: Joi.string().optional().allow("").trim(),
    status: Joi.string()
      .valid("pending", "in_progress", "completed")
      .optional(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    project_id: Joi.string().custom(objectId).optional(),
    status: Joi.string()
      .valid("pending", "in_progress", "completed")
      .optional(),
    is_trashed: Joi.boolean().optional(),
    title: Joi.string().trim().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    sortBy: Joi.string().optional(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    task_id: Joi.string().custom(objectId).required(),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    task_id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      description: Joi.string().optional().allow("").trim(),
      status: Joi.string().valid("pending", "in_progress", "completed"),
    })
    .min(1)
    .messages({
      "object.min": "Please provide project data to update.",
    }),
};

const deleteTask = {
  params: Joi.object().keys({
    task_id: Joi.string().custom(objectId).required(),
  }),
};

const restoreTask = {
  params: Joi.object().keys({
    task_id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  restoreTask,
};
