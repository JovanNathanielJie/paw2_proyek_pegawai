// services/leave.service.js
const Leave = require("../models/Leave");

exports.create = async (data) => {
    return await Leave.create(data);
};

exports.getAll = async () => {
    return await Leave.find()
        .populate("employee", "nip name department position");
};

exports.getOne = async (id) => {
    return await Leave.findById(id)
        .populate("employee");
};

exports.update = async (id, data) => {
    return await Leave.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
    return await Leave.findByIdAndDelete(id);
};
