const Leave = require("../models/Leave");

// CREATE leave request
exports.create = async (req, res) => {
  try {
    console.log('=== CREATE LEAVE REQUEST ===');
    console.log('Body:', req.body);
    console.log('User:', req.user);

    let { employee, leaveType, startDate, endDate } = req.body;

    // Validasi input
    if (!employee || !leaveType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Employee, leaveType, startDate, dan endDate wajib diisi"
      });
    }

    // Konversi dari YYYY-MM-DD ke DD/MM/YYYY jika perlu
    const convertToDD_MM_YYYY = (dateStr) => {
      if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
      }
      return dateStr;
    };

    startDate = convertToDD_MM_YYYY(startDate);
    endDate = convertToDD_MM_YYYY(endDate);
    req.body.startDate = startDate;
    req.body.endDate = endDate;
    
    console.log('Converted dates - Start:', startDate, 'End:', endDate);

    const leave = await Leave.create({
      ...req.body,
      employee: req.body.employee
    });

    console.log('Leave created:', leave);

    res.status(201).json({ 
      success: true, 
      message: "Pengajuan cuti berhasil dibuat", 
      data: leave 
    });
  } catch (err) {
    console.error('Error creating leave:', err);
    res.status(500).json({ 
      success: false, 
      message: "Error creating leave request", 
      error: err.message 
    });
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
    // Convert incoming dates to DD/MM/YYYY if provided in YYYY-MM-DD
    const convertToDD_MM_YYYY = (dateStr) => {
      if (!dateStr) return dateStr;
      if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
      }
      return dateStr;
    };

    if (req.body.startDate) req.body.startDate = convertToDD_MM_YYYY(req.body.startDate);
    if (req.body.endDate) req.body.endDate = convertToDD_MM_YYYY(req.body.endDate);

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
