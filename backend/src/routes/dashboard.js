const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");
const auth = require("../middlewares/auth");

// GET /api/dashboard
router.get("/", auth, DashboardController.getStats);

module.exports = router;
