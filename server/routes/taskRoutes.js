const express = require("express");
const Task = require("../models/Task");
const router = new express.Router();

// Route to create a new task
router.post("/", async (req, res) => {
  try {
    const { userId, title, description, completed } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const task = new Task({ userId, title, description, completed });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
});

// Route to get all tasks for a specific user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }
    const tasks = await Task.find({ userId });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
});

// Get a specific task by task ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting task", error });
  }
});

// Update a task by task ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
});

// Delete a task by task ID
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;
