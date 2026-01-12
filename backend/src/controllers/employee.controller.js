const Employee = require("../models/Employee");

// CREATE
exports.create = async (req, res) => {
  try {
    const { nip, email } = req.body;

    // Validasi NIP unik
    if (nip) {
      const nipExists = await Employee.findOne({ nip });
      if (nipExists) {
        return res.status(400).json({ success: false, message: "NIP already exists" });
      }
    }

    // Validasi Email unik
    if (email) {
      const emailExists = await Employee.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }

    const emp = await Employee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: emp
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: err.message
    });
  }
};


// GET ALL
exports.getAll = async (req, res) => {
  try {
    const list = await Employee.find()
      .populate("department", "name")
      .populate("position", "title");

    res.json({
      success: true,
      message: "Employee list fetched",
      data: list
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching employees",
      error: err.message
    });
  }
};


// GET ONE
exports.getOne = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id)
      .populate("department", "name")
      .populate("position", "title");

    if (!emp) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.json({
      success: true,
      message: "Employee fetched",
      data: emp
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching employee",
      error: err.message
    });
  }
};


// UPDATE
exports.update = async (req, res) => {
  try {
    const { nip, email } = req.body;

    // Cek NIP apakah bentrok dengan employee lain
    if (nip) {
      const nipExists = await Employee.findOne({ nip, _id: { $ne: req.params.id } });
      if (nipExists) {
        return res.status(400).json({ success: false, message: "NIP already used by another employee" });
      }
    }

    // Cek email apakah bentrok
    if (email) {
      const emailExists = await Employee.findOne({ email, _id: { $ne: req.params.id } });
      if (emailExists) {
        return res.status(400).json({ success: false, message: "Email already used by another employee" });
      }
    }

    const emp = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!emp) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.json({
      success: true,
      message: "Employee updated",
      data: emp
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: err.message
    });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);

    if (!emp) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, message: "Employee deleted successfully" });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting employee",
      error: err.message
    });
  }
};
