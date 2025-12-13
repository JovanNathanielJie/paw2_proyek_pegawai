const Attendance = require("../models/Attendance");

exports.create = async (req, res) => {
  try {
    const { employee, date } = req.body;

    // Cek jika sudah absen hari ini
    const exists = await Attendance.findOne({ employee, date });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Attendance already created for this date"
      });
    }

    const att = await Attendance.create(req.body);
    res.status(201).json({ 
      success: true,
      message: "Attendance recorded successfully",
      data: att 
    });

  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Error creating attendance",
      error: err.message
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const list = await Attendance.find()
      .populate("employee", "nip name department position");

    res.json({
      success: true,
      message: "Attendance fetched",
      data: list
    });

  } catch (err) {
    res.status(500).json({      success: false,      message: "Error fetching attendance",
      error: err.message
    });
  }
};


exports.getOne = async (req, res) => {
  try {
    const att = await Attendance.findById(req.params.id)
      .populate("employee");

    if (!att) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    res.json({ success: true, data: att });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
      error: err.message
    });
  }
};


exports.update = async (req, res) => {
  try {
    const att = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!att) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    res.json({
      success: true,
      message: "Attendance updated",
      data: att
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating attendance",
      error: err.message
    });
  }
};


exports.remove = async (req, res) => {
  try {
    const att = await Attendance.findByIdAndDelete(req.params.id);

    if (!att) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.json({ success: true, message: "Attendance deleted successfully" });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting attendance",
      error: err.message
    });
  }
};
