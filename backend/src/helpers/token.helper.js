const jwt = require("jsonwebtoken");
const { envConfig } = require("#config");
const generateToken = (userId) => {
  return jwt.sign({ sub: userId }, envConfig.jwt.secret, {
    expiresIn: `${envConfig.jwt.accessExpirationMinutes}m`,
  });
};
module.exports = { generateToken };
