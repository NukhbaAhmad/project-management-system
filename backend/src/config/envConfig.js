const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const process = require("process");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarSchema = Joi.object()
  .keys({
    // ports
    PORT: Joi.number().required(),
    FALLBACK_PORT: Joi.number().required(),
    // cookies
    COOKIE_SECRET_KEY: Joi.string().required(),

    // db
    MONGO_URI: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envVarSchema
  .prefs({
    errors: { label: "key" },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: {
    main_port: envVars.PORT,
    fallback_port: envVars.FALLBACK_PORT,
  },
  cookies: {
    secret_key: envVars.COOKIE_SECRET_KEY,
  },
  db: {
    url: envVars.MONGO_URI,
  },
};
