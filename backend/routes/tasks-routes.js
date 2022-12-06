const express = require("express");
const router = express.Router();
const taskscontroller = require("../controllers/tasks-controller");

router.get("/", taskscontroller.gettasks);
router.post("/", taskscontroller.addtask);
router.get("/:id", taskscontroller.gettaskbyid);
router.put("/:id", taskscontroller.updatetaskbyid);
router.delete("/:id", taskscontroller.deletetask)


module.exports = router;