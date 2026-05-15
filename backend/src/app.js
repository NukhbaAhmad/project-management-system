const express = require("express");
const passport = require("passport");
const { envConfig } = require("#config");

const cookieParser = require("cookie-parser");
const { errorConverter, errorHandler, rateLimiter } = require("#middlewares");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies for JOI
app.use(cookieParser(envConfig.cookies.secret_key));

app.use(passport.initialize());

// Security
app.use(rateLimiter);

// Error handlers
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
