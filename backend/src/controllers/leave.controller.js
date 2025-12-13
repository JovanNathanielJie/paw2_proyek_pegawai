const Leave = require("../models/Leave");

// CREATE leave request
exports.create = async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      employee: req.body.employee
    });

    res.status(201).json({ success: true, message: "Leave request created successfully", data: leave });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating leave request", error: err.message });
  }
};

// GET all leave
exports.getAll = async (req, res) => {
  try {
    const list = await Leave.find()
      .populate("employee")
      .populate("approvedBy");

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching leave requests", error: err.message });
  }
};

// GET one leave
exports.getOne = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate("employee")
      .populate("approvedBy");

    res.json({ success: true, data: leave });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching leave request", error: err.message });
  }
};

// UPDATE leave (HR/Admin)
exports.update = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Leave updated successfully", data: leave });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating leave", error: err.message });
  }
};

// DELETE leave (Admin only)
exports.remove = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Leave deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting leave", error: err.message });
  }
};
