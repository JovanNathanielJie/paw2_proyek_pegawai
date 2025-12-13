// routes/auth.js
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Register user baru (hanya admin)
router.post("/register", auth, role("admin"), authController.register);

// Login (tanpa auth)
router.post("/login", authController.login);

// Cek token valid
router.get("/me", auth, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
