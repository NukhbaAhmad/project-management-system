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
    NODE_ENV: Joi.string().required(),

    // cookies
    COOKIE_SECRET_KEY: Joi.string().required(),

    // db
    MONGO_URI: Joi.string().required(),

    // Token
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),

    // Rate Limiter
    RATE_LIMITER_MAX_ALLOWED_REQUESTS: Joi.number().required(),

    // Cors Configuration
    CORS_ORIGIN: Joi.string().required(),
    CORS_FALLBACK_ORIGIN: Joi.string().required(),
    CORS_METHODS: Joi.string().required(),
    CORS_ALLOWED_HEADERS: Joi.string().required(),
  })
  .options({
    abortEarly: false,
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
    env: envVars.NODE_ENV,
  },
  cookies: {
    secret_key: envVars.COOKIE_SECRET_KEY,
  },
  db: {
    url: envVars.MONGO_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  rateLimiter: {
    maxAllowedRequests: envVars.RATE_LIMITER_MAX_ALLOWED_REQUESTS,
  },
  cors: {
    origin: envVars.CORS_ORIGIN || envVars.CORS_FALLBACK_ORIGIN,
    methods: envVars.CORS_METHODS,
    allowedHeaders: envVars.CORS_ALLOWED_HEADERS,
  },
};
