const router = require("express").Router();
const controller = require("../controllers/employee.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// CREATE employee: Admin & HR
router.post("/", auth, role("admin", "hr"), controller.create);

// UPDATE employee: Admin & HR
router.put("/:id", auth, role("admin", "hr"), controller.update);

// DELETE employee: Admin ONLY
router.delete("/:id", auth, role("admin"), controller.remove);

// READ employee: All roles
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getOne);

module.exports = router;
