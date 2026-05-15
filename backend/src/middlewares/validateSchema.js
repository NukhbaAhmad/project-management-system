const Joi = require("joi");
const { errorLabels } = require("#constants");
const { generalHelpers } = require("#helpers");
const { status: httpStatus } = require("http-status");
const { ApiError, pick } = require("#utils");

const validateSchema = (schema) => (req, res, next) => {
  const validSchema = pick(schema, [
    "query",
    "body",
    "params",
    "signedCookies",
  ]);
  const object = pick(req, Object.keys(validSchema));
  Object.keys(validSchema).forEach((key) => {
    if (object[key] === undefined) {
      object[key] = {};
    }
  });
  const { value, error } = Joi.compile(validSchema).validate(object, {
    errors: { label: "key", wrap: { label: false } },
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => {
      const originalField = detail.path[detail.path.length - 1];
      return {
        message: generalHelpers.capitalize(detail.message),
        field: generalHelpers.lowerCase(errorLabels[originalField] || originalField),
      };
    });
    const message = "Validation Error";
    const err = new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message,
      isOperational: true,
      errors,
    });

    return next(err);
  }
  if (value.body) req.body = value.body;
  if (value.query) req.query = value.query;
  if (value.params) req.params = value.params;
  if (value.signedCookies) req.signedCookies = value.signedCookies;
  return next();
};

module.exports = validateSchema;
