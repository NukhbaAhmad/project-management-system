const express = require("express");
const { auth } = require("#middlewares");
const { dashboardController } = require("#controllers");

const router = express.Router();
router.use(auth());

router.get("/", dashboardController.getDashboard);

module.exports = router;
