const fs = require('fs');
const path = require('path');
const { generateUniqueId, isValidDate, loadTodoList, saveTodoList, saveTodoLists } = require("../Utils/eventUtils");

const eventsFilePath = path.join(__dirname, '..', 'Data', 'events.json');

let todoList = loadTodoList();

const getTasks = (req, res) => {
  const userID = req.decoded.id;
  const userTasks = todoList.filter((task) => task.userID === userID);
  res.json(userTasks);
};

const addTask = (req, res) => {
  const { title, date } = req.body;
  const userID = req.decoded.id;

  if (!title || !date) {
    return res.status(400).json({ success: false, message: 'Title and date are required' });
  }

  const existingData = loadTodoList();
  const existingTaskWithTitle = existingData.find((task) => task.userID === userID && task.title === title);
  const existingTaskWithDate = existingData.find((task) => task.userID === userID && task.date === date);

  if (existingTaskWithTitle) {
    return res.status(400).json({ success: false, message: 'Task with the same title already exists' });
  }

  if (existingTaskWithDate) {
    return res.status(400).json({ success: false, message: 'Task with the same date already exists' });
  }

  if (isValidDate(date)) {
    const newTask = { id: generateUniqueId(existingData), userID, title, date };
    existingData.push(newTask);
    saveTodoList(existingData);
    res.json({ success: true, message: 'Task added successfully', task: newTask });
  } else {
    res.status(400).json({ success: false, message: 'Invalid date' });
  }
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  if (isNaN(taskId)) {
    return res.status(400).json({ success: false, message: 'Invalid Task ID' });
  }

  const existingData = loadTodoList();
  const updatedData = existingData.filter(task => task.id !== taskId);
  if (existingData.length > updatedData.length) {
    saveTodoLists(updatedData, eventsFilePath);
    res.json({ success: true, message: 'Task deleted successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Task not found with the provided ID' });
  }
};


const markTaskAsDone = (req, res) => {
  const taskId = req.params.id.toString();

  if (!taskId) {
    return res.status(400).json({ success: false, message: 'Task ID is required' });
  }

  const existingData = loadTodoList();
  const taskIndex = existingData.findIndex((task) => task.id.toString() === taskId);

  if (taskIndex !== -1) {
    existingData[taskIndex].done = true;
    saveTodoList(existingData);
    res.json({ success: true, message: 'Task marked as done successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Task not found with the provided ID' });
  }
};

module.exports = { getTasks, addTask, deleteTask, markTaskAsDone };
