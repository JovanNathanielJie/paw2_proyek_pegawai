const router = require("express").Router();
const controller = require("../controllers/position.controller");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// READ – semua role boleh
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getOne);

// CREATE – admin & hr
router.post("/", auth, role("admin", "hr"), controller.create);

// UPDATE – admin & hr
router.put("/:id", auth, role("admin", "hr"), controller.update);

// DELETE – hanya admin
router.delete("/:id", auth, role("admin"), controller.remove);

module.exports = router;
