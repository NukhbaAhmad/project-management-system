const { rateLimit } = require("express-rate-limit");
const { envConfig } = require("#config");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: envConfig.rateLimiter.maxAllowedRequests,
  skipSuccessfulRequests: true,
  message: "Requests limit exceeded.Please try again later.",
});

module.exports = rateLimiter;
