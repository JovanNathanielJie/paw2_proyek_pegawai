const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    leaveType: {
      type: String,
      enum: ["sick", "personal", "vacation", "maternity", "other"],
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v >= this.startDate;
        },
        message: "endDate must be after startDate"
      }
    },

    durationDays: Number,

    reason: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    approvedByRole: {
      type: String,
      enum: ["admin", "hr"],
    }
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Calculate duration automatically
LeaveSchema.pre("save", function (next) {
  const diff = this.endDate - this.startDate;
  this.durationDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  next();
});

module.exports = mongoose.model("Leave", LeaveSchema);
