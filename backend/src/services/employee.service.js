// services/employee.service.js
const Employee = require("../models/Employee");

exports.create = async (data) => {
    const exists = await Employee.findOne({ nip: data.nip });
    if (exists) throw new Error("NIP already exists");

    return await Employee.create(data);
};

exports.getAll = async () => {
    return await Employee.find()
        .populate("department")
        .populate("position");
};

exports.getOne = async (id) => {
    return await Employee.findById(id)
        .populate("department")
        .populate("position");
};

exports.update = async (id, data) => {
    return await Employee.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Employee.findByIdAndDelete(id);
};
