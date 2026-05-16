const express = require("express");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const projectRoutes = require("./project.route");
const taskRoutes = require("./task.route");
const dashboardRoutes = require("./dashboard.route");

const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/project", route: projectRoutes },
  { path: "/tasks", route: taskRoutes },
  { path: "/dashboard", route: dashboardRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
