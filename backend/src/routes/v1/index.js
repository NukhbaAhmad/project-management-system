const express = require("express");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const projectRoutes = require("./project.route");
const taskRoutes = require("./task.route");

const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/project", route: projectRoutes },
  { path: "/project/:projectId/task", route: taskRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
