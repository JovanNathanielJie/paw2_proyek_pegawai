const Department = require("../models/Department");

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const dept = await Department.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: dept
    });
  } catch (err) {
    // Duplicate key error (name sudah ada)
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Department name already exists" });
    }

    res.status(500).json({
      success: false,
      message: "Error creating department",
      error: err.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Department.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Department list retrieved",
      data: list
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching departments" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);

    if (!dept) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    res.json({ success: true, data: dept });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching department" });
  }
};

exports.update = async (req, res) => {
  try {
    const update = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!update) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    res.json({
      success: true,
      message: "Department updated successfully",
      data: update
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Department name already exists" });
    }

    res.status(500).json({
      success: false,
      message: "Error updating department",
      error: err.message
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    res.json({ success: true, message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting department",
      error: err.message
    });
  }
};
