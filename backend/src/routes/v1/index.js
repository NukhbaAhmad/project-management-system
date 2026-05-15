const express = require("express");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");

const router = express.Router();

const routes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
