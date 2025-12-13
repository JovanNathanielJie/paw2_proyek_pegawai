// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB connected successfully");

    // Event listener tambahan
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Reconnecting...");
    });

  } catch (error) {
    console.error("❌ MongoDB initial connection failed:", error.message);
    process.exit(1); // keluar karena server tidak bisa jalan tanpa DB
  }
};

module.exports = connectDB;
