const User = require("../models/User");
const bcrypt = require("bcryptjs");

// CREATE - Create new user (Admin only)
exports.create = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validasi username unik
    if (username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }
    }

    // Validasi email unik
    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }

    // Hash password (client sends `password`)
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
      role: role || "viewer"
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message
    });
  }
};

// GET ALL - Get all users (Admin only)
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.json({
      success: true,
      message: "User list fetched",
      data: users
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message
    });
  }
};

// GET ONE - Get single user by ID (Admin only)
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User fetched",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message
    });
  }
};

// UPDATE - Update user data (Admin only or user themselves)
exports.update = async (req, res) => {
  try {
    const { username, email, role, isActive } = req.body;
    const requester = req.user || {}; // from auth middleware

    // Validasi username unik (jika username diubah)
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already exists" });
      }
    }

    // Validasi email unik (jika email diubah)
    if (email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingEmail) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    // Only admin may change role or isActive
    if (requester.role === "admin") {
      if (role) updateData.role = role;
      if (isActive !== undefined) updateData.isActive = isActive;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: err.message
    });
  }
};

// DELETE - Delete user (Admin only)
exports.remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err.message
    });
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // dari middleware auth

    // Validasi input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Old password and new password are required" });
    }

    // Cari user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validasi old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.passwordHash = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: err.message
    });
  }
};
