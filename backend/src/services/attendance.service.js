// services/attendance.service.js
const Attendance = require("../models/Attendance");

exports.create = async (data) => {
    const { employee, date } = data;
    const exists = await Attendance.findOne({ employee, date });
    if (exists) throw new Error("Attendance already created for this date");

    return await Attendance.create(data);
};

exports.getAll = async () => {
    return await Attendance.find().populate("employee", "nip name department position");
};

exports.getOne = async (id) => {
    return await Attendance.findById(id).populate("employee");
};

exports.update = async (id, data) => {
    return await Attendance.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Attendance.findByIdAndDelete(id);
};
