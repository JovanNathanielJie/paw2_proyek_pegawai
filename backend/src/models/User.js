const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    sparse: true // tidak error kalau kosong
  },

  passwordHash: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "hr", "viewer"],
    default: "viewer"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true }); // createdAt & updatedAt otomatis

module.exports = mongoose.model("User", UserSchema);
