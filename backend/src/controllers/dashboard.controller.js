const DashboardService = require("../services/dashboard.service");

class DashboardController {
    static async getStats(req, res) {
        try {
            const data = await DashboardService.getDashboardStats();
            res.status(200).json({
                success: true,
                message: "Dashboard statistics fetched successfully",
                data
            });
        } catch (error) {
            console.error("Dashboard Error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to load dashboard data",
                error: error.message
            });
        }
    }
}

module.exports = DashboardController;
