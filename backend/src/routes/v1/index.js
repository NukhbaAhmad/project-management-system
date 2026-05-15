const express = require("express");
const authRoutes = require("./auth.route");

const router = express.Router();

const routes = [{ path: "/", route: authRoutes }];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
