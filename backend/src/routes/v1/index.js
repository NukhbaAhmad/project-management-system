const express = require("express");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const projectRoutes = require("./project.route");

const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/project", route: projectRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
