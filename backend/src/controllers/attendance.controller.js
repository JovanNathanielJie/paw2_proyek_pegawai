const Attendance = require("../models/Attendance");

exports.create = async (req, res) => {
  try {
    console.log('=== CREATE ATTENDANCE REQUEST ===');
    console.log('Body:', req.body);
    console.log('User:', req.user);

    let { employee, date } = req.body;

    // Validasi input
    if (!employee || !date) {
      return res.status(400).json({
        success: false,
        message: "Employee dan date wajib diisi"
      });
    }

    // Konversi dari YYYY-MM-DD ke DD/MM/YYYY jika perlu
    if (date.includes('-') && date.split('-')[0].length === 4) {
      const [year, month, day] = date.split('-');
      date = `${day}/${month}/${year}`;
      req.body.date = date;
      console.log('Converted date to DD/MM/YYYY:', date);
    }

    // Cek jika sudah absen hari ini
    const exists = await Attendance.findOne({ employee, date });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Absensi untuk tanggal ini sudah ada"
      });
    }

    const att = await Attendance.create(req.body);
    console.log('Attendance created:', att);
    
    res.status(201).json({ 
      success: true,
      message: "Absensi berhasil dicatat",
      data: att 
    });

  } catch (err) {
    console.error('Error creating attendance:', err);
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
