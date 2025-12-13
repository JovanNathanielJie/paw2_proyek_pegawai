// controllers/auth.controller.js
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user   // user tanpa passwordHash
        });

    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            data: result.user   // user tanpa passwordHash
        });

    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            message: err.message
        });
    }
};
