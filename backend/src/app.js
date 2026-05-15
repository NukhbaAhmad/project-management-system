const express = require("express");
const passport = require("passport");
const cors = require("cors");
const { envConfig, jwtStrategy } = require("#config");
const routes = require("#routes/v1/index");

const cookieParser = require("cookie-parser");
const { errorConverter, errorHandler, rateLimiter } = require("#middlewares");

const app = express();

app.use(
  cors({
    origin: envConfig.cors.origin,
    methods: envConfig.cors.methods,
    allowedHeaders: envConfig.cors.allowedHeaders,
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies for JOI
app.use(cookieParser(envConfig.cookies.secret_key));

app.use(passport.initialize());
passport.use(jwtStrategy);
app.use("/v1", routes);

// Security
app.use(rateLimiter);

// Error handlers
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;
