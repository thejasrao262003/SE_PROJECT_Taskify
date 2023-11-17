const router = require("express").Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { Task_ID, Task_Name, Status, Employee_name, Priority } = req.body;

    if (!Task_ID || !Task_Name || !Status || !Employee_name || !Priority) {
      return res.status(400).send({ message: "Incomplete task information" });
    }

    const newTask = new Task({
      Task_ID,
      Task_Name,
      Status,
      Employee_name,
      Priority,
    });

    await newTask.save();

    res.status(201).send({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete a task by Task_ID
router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.deleteOne({ Task_ID: taskId });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update tasks
router.post("/update", async (req, res) => {
  try {
    const updatedTasks = req.body;

    await Promise.all(
      updatedTasks.map(async (updatedTask) => {
        const { Task_ID, Status } = updatedTask;
        await Task.findOneAndUpdate({ Task_ID }, { Status });
      })
    );

    res.status(200).json({ message: 'Tasks updated successfully' });
  } catch (error) {
    console.error('Error updating tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
