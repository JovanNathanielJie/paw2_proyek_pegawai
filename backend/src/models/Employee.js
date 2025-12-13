const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  nip: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  gender: {
    type: String,
    enum: ["M", "F", "Other"],
    default: "M"
  },

  birthDate: Date,
  address: String,
  phone: String,

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    sparse: true // Supaya unique error tidak muncul saat kosong
  },

  joinDate: {
    type: Date,
    default: Date.now
  },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },

  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position"
  },

  status: {
    type: String,
    enum: ["active", "inactive", "resigned"],
    default: "active"
  }
}, {
  timestamps: true // otomatis buat createdAt & updatedAt
});

module.exports = mongoose.model("Employee", EmployeeSchema);
