const mongoose = require("mongoose");
// Define Schemes
const taskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" }, // Now optional with a default empty string
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create new task document
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
