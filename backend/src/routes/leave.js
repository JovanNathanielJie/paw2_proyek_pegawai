const router = require("express").Router();
const controller = require("../controllers/leave.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// CREATE leave — Admin & HR
router.post("/", auth, role("admin", "hr"), controller.create);

// UPDATE leave — Admin & HR
router.put("/:id", auth, role("admin", "hr"), controller.update);

// DELETE leave — Admin only
router.delete("/:id", auth, role("admin"), controller.remove);

// GET all leave — All roles (admin/hr/viewer)
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getOne);

module.exports = router;
