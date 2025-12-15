const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// 🔓 REGISTER TANPA AUTH (UNTUK SETUP AWAL)
router.post("/register", authController.register);

// 🔓 LOGIN TANPA AUTH
router.post("/login", authController.login);

// 🔐 CEK TOKEN
router.get("/me", auth, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
