const Leave = require("../models/Leave");

// CREATE leave request
exports.create = async (req, res) => {
  try {
    console.log('=== CREATE LEAVE REQUEST ===');
    console.log('Body:', JSON.stringify(req.body, null, 2));

    let { employee, leaveType, startDate, endDate } = req.body;

    // Validasi input
    if (!employee || !leaveType || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Employee, leaveType, startDate, dan endDate wajib diisi"
      });
    }

    // Konversi dari YYYY-MM-DD ke DD/MM/YYYY
    const convertToDD_MM_YYYY = (dateStr) => {
      if (!dateStr) return dateStr;
      // Cek apakah format YYYY-MM-DD (dari HTML input type="date")
      if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        const [year, month, day] = dateStr.split('-');
        // Pastikan format DD/MM/YYYY dengan padding 0 jika perlu
        const dayPadded = day.padStart(2, '0');
        const monthPadded = month.padStart(2, '0');
        return `${dayPadded}/${monthPadded}/${year}`;
      }
      // Jika sudah format DD/MM/YYYY, kembalikan apa adanya
      return dateStr;
    };

    const originalStart = startDate;
    const originalEnd = endDate;
    
    startDate = convertToDD_MM_YYYY(startDate);
    endDate = convertToDD_MM_YYYY(endDate);
    
    console.log(`Date conversion: ${originalStart} => ${startDate}`);
    console.log(`Date conversion: ${originalEnd} => ${endDate}`);

    const leave = await Leave.create({
      employee,
      leaveType,
      startDate,
      endDate,
      reason: req.body.reason,
      status: req.body.status || 'pending'
    });

    console.log('Leave created successfully:', leave._id);

    res.status(201).json({ 
      success: true, 
      message: "Pengajuan cuti berhasil dibuat", 
      data: leave 
    });
  } catch (err) {
    console.error('Error creating leave:', err.message);
    if (err.errors) {
      console.error('Validation errors:', JSON.stringify(err.errors, null, 2));
    }
    res.status(500).json({ 
      success: false, 
      message: err.message || "Error creating leave request", 
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
      // Cek apakah format YYYY-MM-DD (dari HTML input type="date")
      if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        const [year, month, day] = dateStr.split('-');
        // Pastikan format DD/MM/YYYY dengan padding 0
        const dayPadded = day.padStart(2, '0');
        const monthPadded = month.padStart(2, '0');
        return `${dayPadded}/${monthPadded}/${year}`;
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
