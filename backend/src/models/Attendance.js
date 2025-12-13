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

  checkIn: Date,
  checkOut: Date,

  status: {
    type: String,
    enum: ["present", "late", "absent"],
    default: "present"
  },

  notes: String
}, {
  timestamps: true
});

// Mencegah double attendance per hari
AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
