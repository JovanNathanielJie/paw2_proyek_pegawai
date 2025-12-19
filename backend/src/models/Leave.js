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
      // Match Indonesian UI options
      enum: ["Sakit", "Pribadi", "Liburan", "Melahirkan", "Lainnya"],
      required: true
    },

    startDate: {
      type: String, // Format: DD/MM/YYYY (contoh: 19/12/2025)
      required: true,
      validate: {
        validator: function(v) {
          return /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/.test(v);
        },
        message: 'startDate harus dalam format DD/MM/YYYY (contoh: 19/12/2025)'
      }
    },

    endDate: {
      type: String, // Format: DD/MM/YYYY (contoh: 25/12/2025)
      required: true,
      validate: {
        validator: function(v) {
          return /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/.test(v);
        },
        message: 'endDate harus dalam format DD/MM/YYYY (contoh: 25/12/2025)'
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

// Calculate duration automatically from DD/MM/YYYY strings
LeaveSchema.pre("save", function (next) {
  try {
    // Parse DD/MM/YYYY to Date
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/');
      return new Date(year, month - 1, day);
    };
    
    const start = parseDate(this.startDate);
    const end = parseDate(this.endDate);
    
    if (end < start) {
      return next(new Error('Tanggal selesai harus setelah atau sama dengan tanggal mulai'));
    }
    
    const diff = end - start;
    this.durationDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
    next();
  } catch (err) {
    next(new Error('Format tanggal tidak valid. Gunakan DD/MM/YYYY'));
  }
});

module.exports = mongoose.model("Leave", LeaveSchema);
