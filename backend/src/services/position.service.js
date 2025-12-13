// services/position.service.js
const Position = require("../models/Position");

exports.create = async (data) => {
    return await Position.create(data);
};

exports.getAll = async () => {
    return await Position.find().sort({ createdAt: -1 });
};

exports.getOne = async (id) => {
    return await Position.findById(id);
};

exports.update = async (id, data) => {
    return await Position.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

exports.remove = async (id) => {
    return await Position.findByIdAndDelete(id);
};
