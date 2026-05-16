const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createProject = {
  body: Joi.object().keys({
    title: Joi.string().required().trim(),
    description: Joi.string().optional().allow("").trim(),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    title: Joi.string().optional(),
    is_trashed: Joi.boolean().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    sortBy: Joi.string().optional(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    project_id: Joi.string().custom(objectId).required(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    project_id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim(),
      description: Joi.string().trim().allow(""),
    })
    .min(1)
    .messages({
      "object.min": "Please provide project data to update.",
    }),
};

const deleteProject = {
  params: Joi.object().keys({
    project_id: Joi.string().custom(objectId).required(),
  }),
};

const restoreProject = {
  params: Joi.object().keys({
    project_id: Joi.string().custom(objectId).required(),
  }),
};
const restoreProjectTasks = {
  params: Joi.object().keys({
    project_id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  restoreProject,
  restoreProjectTasks,
};
