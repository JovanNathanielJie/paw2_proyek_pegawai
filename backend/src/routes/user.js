const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// CREATE user: Admin only
router.post("/", auth, role("admin"), controller.create);

// UPDATE user: Admin or the user themselves (cannot change role/isActive if not admin)
router.put("/:id", auth, (req, res, next) => {
	// allow admin or owner
	if (req.user && (req.user.role === "admin" || req.user.id === req.params.id)) {
		return next();
	}
	return res.status(403).json({ success: false, message: "Access denied" });
}, controller.update);

// DELETE user: Admin only
router.delete("/:id", auth, role("admin"), controller.remove);

// READ users: Admin only
router.get("/", auth, role("admin"), controller.getAll);
router.get("/:id", auth, role("admin"), controller.getOne);

// CHANGE PASSWORD: Any authenticated user
router.post("/change-password", auth, controller.changePassword);

module.exports = router;
