const router = require("express").Router();
const controller = require("../controllers/attendance.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// CREATE attendance: Admin & HR
router.post("/", auth, role("admin", "hr"), controller.create);

// UPDATE attendance: Admin & HR
router.put("/:id", auth, role("admin", "hr"), controller.update);

// DELETE attendance: Admin ONLY
router.delete("/:id", auth, role("admin"), controller.remove);

// READ attendance: All roles
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getOne);

module.exports = router;
