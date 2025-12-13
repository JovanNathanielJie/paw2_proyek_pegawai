const Position = require("../models/Position");
const Department = require("../models/Department");

// CREATE
exports.create = async (req, res) => {
  try {
    const { title, description, baseSalary, department, level } = req.body;

    // cek department valid
    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(400).json({ success: false, message: "Invalid department ID" });
    }

    const pos = await Position.create({
      title,
      description,
      baseSalary,
      department,
      level
    });

    res.status(201).json({
      success: true,
      message: "Position created successfully",
      data: pos
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating position",
      error: err.message
    });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const list = await Position.find().populate("department");
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching positions" });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const pos = await Position.findById(req.params.id).populate("department");

    if (!pos) {
      return res.status(404).json({ success: false, message: "Position not found" });
    }

    res.json({ success: true, data: pos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching position" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { department } = req.body;

    // jika ada update department → validasi dulu
    if (department) {
      const deptExists = await Department.findById(department);
      if (!deptExists) {
        return res.status(400).json({ success: false, message: "Invalid department ID" });
      }
    }

    const pos = await Position.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!pos) {
      return res.status(404).json({ success: false, message: "Position not found" });
    }

    res.json({ success: true, message: "Position updated successfully", data: pos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating position", error: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const deleted = await Position.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Position not found" });
    }

    res.json({ success: true, message: "Position deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting position", error: err.message });
  }
};
