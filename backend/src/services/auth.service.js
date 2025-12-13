// services/auth.service.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (data) => {
    const { username, email, password, role } = data;

    const exists = await User.findOne({ username });
    if (exists) throw new Error("Username already exists");

    if (email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) throw new Error("Email already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        passwordHash: hash,
        role
    });

    // return sanitized user (no passwordHash)
    const { _id, username: uname, email: uemail, role: urole, isActive } = user;
    return { _id, username: uname, email: uemail, role: urole, isActive };
};

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid username or password");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid username or password");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    const { _id, username: uname, email: uemail, role: urole, isActive } = user;
    const sanitizedUser = { _id, username: uname, email: uemail, role: urole, isActive };
    return { user: sanitizedUser, token };
};
