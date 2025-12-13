const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    description: String,

    baseSalary: {
      type: Number,
      min: 0,
      default: 0
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },

    level: {
      type: String,
      enum: ["staff", "senior", "supervisor", "manager", "head", "director"],
      default: "staff"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true } // createdAt + updatedAt auto
);

module.exports = mongoose.model("Position", PositionSchema);
