// services/department.service.js
const Department = require("../models/Department");

exports.create = async (data) => {
    return await Department.create(data);
};

exports.getAll = async () => {
    return await Department.find().sort({ createdAt: -1 });
};

exports.getOne = async (id) => {
    return await Department.findById(id);
};

exports.update = async (id, data) => {
    return await Department.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

exports.remove = async (id) => {
    return await Department.findByIdAndDelete(id);
};
