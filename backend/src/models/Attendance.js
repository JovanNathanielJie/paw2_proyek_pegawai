const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  date: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },

  // Store time-of-day as HH:mm string to match UI
  checkIn: String,
  checkOut: String,

  status: {
    type: String,
    // Align with UI options
    // Align with Indonesian UI values
    enum: ["Hadir", "Terlambat", "Tidak Hadir", "Sakit", "Cuti"],
    default: "Hadir"
  },

  notes: String
}, {
  timestamps: true
});

// Mencegah double attendance per hari
AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
