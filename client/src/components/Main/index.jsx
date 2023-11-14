import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'; // Import Switch and Route
import './styles.css';
import Navbar from '../navbar/navbar';
const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Task 1', status: 'todo', employee: 'John Doe', priority: 'High' },
    { id: 2, taskName: 'Task 2', status: 'doing', employee: 'Jane Doe', priority: 'Low' },
    { id: 3, taskName: 'Task 3', status: 'done', employee: 'Bob Smith', priority: 'Medium' },
  ]);

  const [newTask, setNewTask] = useState({
    taskName: '',
    status: 'todo',
    employee: '',
    priority: 'Low',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleCreateTask = () => {
    if (!newTask.taskName || !newTask.employee) {
      alert('Task Name and Employee are required!');
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
    setNewTask({
      taskName: '',
      status: 'todo',
      employee: '',
      priority: 'Low',
    });
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();

    const droppedTask = JSON.parse(e.dataTransfer.getData('text/plain'));

    if (droppedTask.status !== status) {
      const updatedTasks = tasks.map((task) =>
        task.id === droppedTask.id ? { ...task, status } : task
      );
      setTasks(updatedTasks);
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
			{tasks
				.filter((task) => task.status === 'todo')
				.map((task) => (
				<div
					key={task.id}
					draggable
					onDragStart={(e) => handleDragStart(e, task)}
					className="task"
				>
					{task.taskName} ({task.employee}, {task.priority})
				</div>
				))}
			</div>

			<div
			className="column"
			onDragOver={(e) => handleDragOver(e)}
			onDrop={(e) => handleDrop(e, 'doing')}
			>
			<h2>Doing</h2>
			{tasks
				.filter((task) => task.status === 'doing')
				.map((task) => (
				<div
					key={task.id}
					draggable
					onDragStart={(e) => handleDragStart(e, task)}
					className="task"
				>
					{task.taskName} ({task.employee}, {task.priority})
				</div>
				))}
			</div>

			<div
			className="column"
			onDragOver={(e) => handleDragOver(e)}
			onDrop={(e) => handleDrop(e, 'done')}
			>
			<h2>Done</h2>
			{tasks
				.filter((task) => task.status === 'done')
				.map((task) => (
				<div
					key={task.id}
					draggable
					onDragStart={(e) => handleDragStart(e, task)}
					className="task"
				>
					{task.taskName} ({task.employee}, {task.priority})
				</div>
				))}
			</div>

			<div className="new-task-form">
			<h2>Create New Task</h2>
			<label>
				Task Name:
				<input
				type="text"
				name="taskName"
				value={newTask.taskName}
				onChange={handleInputChange}
				className="input-field"
				/>
			</label>
			<label>
				Status:
				<select name="status" value={newTask.status} onChange={handleInputChange} className="input-field">
				<option value="todo">Todo</option>
				<option value="doing">Doing</option>
				<option value="done">Done</option>
				</select>
			</label>
			<label>
				Employee:
				<input
				type="text"
				name="employee"
				value={newTask.employee}
				onChange={handleInputChange}
				className="input-field"
				/>
			</label>
			<label>
				Priority:
				<select
				name="priority"
				value={newTask.priority}
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
