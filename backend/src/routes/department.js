const router = require("express").Router();
const controller = require("../controllers/department.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role"); // ← wajib

// hanya admin boleh create/update/delete department
router.post("/", auth, role("admin", "hr"), controller.create);
router.put("/:id", auth, role("admin", "hr"), controller.update);
router.delete("/:id", auth, role("admin"), controller.remove);

// semua role boleh read
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getOne);

module.exports = router;
