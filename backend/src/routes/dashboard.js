const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/dashboard.controller");

// GET /api/dashboard
router.get("/", DashboardController.getStats);

module.exports = router; w
