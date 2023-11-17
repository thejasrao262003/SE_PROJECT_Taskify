import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import './styles.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    Task_ID: '',
    Task_Name: '',
    Status: 'todo',
    Employee_name: '',
    Priority: 'Low',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout');
      localStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const [error, setError] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();
  
    try {
      const url = "http://localhost:8080/api/tasks";
      const response = await axios.post(url, newTask);
      setTasks(response.data);
  
      // Reload the page after successfully creating a task
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
      console.error("Error creating task:", error);
    }
  
    setNewTask({
      Task_ID: "",
      Task_Name: "",
      Status: "todo",
      Employee_name: "",
      Priority: "Low",
    });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const url = `http://localhost:8080/api/tasks/${taskId}`;
      await axios.delete(url);

      // Filter out the deleted task from the state
      const updatedTasks = tasks.filter((task) => task.Task_ID !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
  
    const droppedTask = JSON.parse(e.dataTransfer.getData('text/plain'));
  
    if (Array.isArray(tasks) && tasks.length > 0) {
      if (droppedTask.Status !== status) {
        const updatedTasks = tasks.map((task) =>
          task.Task_ID === droppedTask.Task_ID ? { ...task, Status: status } : task
        );
  
        // Update the server with the new tasks
        try {
          const response = await axios.post('http://localhost:8080/api/tasks/update', updatedTasks);
          // Optionally handle success response
        } catch (error) {
          console.error('Error updating tasks:', error);
        }
  
        // Update the local state with the new tasks
        setTasks(updatedTasks);
      }
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="kanban-container">
        <h1>Kanban Board</h1>
        <div className="kanban-board">
          <div
            className="column"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, 'todo')}
          >
            <h2>Todo</h2>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks
                .filter((task) => task.Status === 'todo')
                .map((task) => (
                  <div
                    key={task.Task_ID}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="task"
                  >
                    <div>
                      {task.Task_Name} ({task.Employee_name}, {task.Priority})
                    </div>
                    <button onClick={() => handleDeleteTask(task.Task_ID)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                ))
            ) : (
              <p>No tasks in this column</p>
            )}
          </div>

          <div
            className="column"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, 'doing')}
          >
            <h2>Doing</h2>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks
                .filter((task) => task.Status === 'doing')
                .map((task) => (
                  <div
                    key={task.Task_ID}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="task"
                  >
                    <div>
                      {task.Task_Name} ({task.Employee_name}, {task.Priority})
                    </div>
                    <button onClick={() => handleDeleteTask(task.Task_ID)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                ))
            ) : (
              <p>No tasks in this column</p>
            )}
          </div>

          <div
            className="column"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, 'done')}
          >
            <h2>Done</h2>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks
                .filter((task) => task.Status === 'done')
                .map((task) => (
                  <div
                    key={task.Task_ID}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="task"
                  >
                    <div>
                      {task.Task_Name} ({task.Employee_name}, {task.Priority})
                    </div>
                    <button onClick={() => handleDeleteTask(task.Task_ID)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                ))
            ) : (
              <p>No tasks in this column</p>
            )}
          </div>

          <div className="new-task-form">
            <h2>Create New Task</h2>
            <label>
              Task ID:
              <input
                type="text"
                name="Task_ID"
                value={newTask.Task_ID}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Task Name:
              <input
                type="text"
                name="Task_Name"
                value={newTask.Task_Name}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Status:
              <select name="Status" value={newTask.Status} onChange={handleInputChange} className="input-field">
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </label>
            <label>
              Employee:
              <input
                type="text"
                name="Employee_name"
                value={newTask.Employee_name}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Priority:
              <select
                name="Priority"
                value={newTask.Priority}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <button onClick={handleCreateTask} className="create-btn">Create Task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
