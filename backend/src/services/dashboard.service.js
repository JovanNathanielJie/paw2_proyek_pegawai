const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Department = require("../models/Department");
const Position = require("../models/Position");

class DashboardService {
    static async getDashboardStats() {
        // Basic counts
        const totalEmployees = await Employee.countDocuments();
        const totalActive = await Employee.countDocuments({ status: "active" });
        const totalNonActive = await Employee.countDocuments({ status: { $ne: "active" } });

        // Employees per department
        const totalPerDepartment = await Employee.aggregate([
            { $match: { department: { $ne: null } } },
            { $group: { _id: "$department", total: { $sum: 1 } } },
            {
                $lookup: {
                    from: "departments",
                    localField: "_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            { $unwind: { path: "$department", preserveNullAndEmptyArrays: true } },
            { $project: { _id: 0, departmentId: "$_id", departmentName: "$department.name", total: 1 } }
        ]);

        // Employees per position
        const totalPerPosition = await Employee.aggregate([
            { $match: { position: { $ne: null } } },
            { $group: { _id: "$position", total: { $sum: 1 } } },
            {
                $lookup: {
                    from: "positions",
                    localField: "_id",
                    foreignField: "_id",
                    as: "position"
                }
            },
            { $unwind: { path: "$position", preserveNullAndEmptyArrays: true } },
            { $project: { _id: 0, positionId: "$_id", positionTitle: "$position.title", total: 1 } }
        ]);

        // Attendance today (date stored as YYYY-MM-DD string)
        const today = new Date().toISOString().slice(0, 10);
        const attendanceToday = await Attendance.countDocuments({ date: today, status: "present" });

        // Leave pending
        const leavePending = await Leave.countDocuments({ status: "pending" });

        return {
            totalEmployees,
            totalActive,
            totalNonActive,
            totalPerDepartment,
            totalPerPosition,
            attendanceToday,
            leavePending
        };
    }
}

module.exports = DashboardService;
