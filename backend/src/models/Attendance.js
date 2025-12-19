const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  date: {
    type: String, // Format: DD/MM/YYYY
    required: true
  },

  // Store time as HH:MM string (e.g., "07:50", "17:00")
  checkIn: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'checkIn harus dalam format HH:MM (contoh: 07:50)'
    }
  },
  checkOut: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'checkOut harus dalam format HH:MM (contoh: 17:00)'
    }
  },

  status: {
    type: String,
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
