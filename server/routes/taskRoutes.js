const express = require("express");
const Task = require("../models/Task");
const router = new express.Router();

// Route to create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({ title, description, completed });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
});

// Route to get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
});

// Get a task by id
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

// Update a task by id
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

// Delete a task by ID
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
