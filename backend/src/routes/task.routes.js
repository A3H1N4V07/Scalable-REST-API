const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const Task = require("../models/task.model");

// Normal user routes
router.post("/", auth, taskController.createTask);
router.get("/", auth, taskController.getTasks);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);


router.get(
  "/admin/all",
  auth,
  role("admin"),
  async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
