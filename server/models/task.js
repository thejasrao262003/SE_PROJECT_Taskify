const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  Task_ID: { type: String, required: true },
  Task_Name: { type: String, required: true },
  Status: { type: String, required: true },
  Employee_name: { type: String, required: true },
  Priority: { type: String, required: true },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
