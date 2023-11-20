const fs = require('fs');
const path = require('path');

const eventsFilePath = path.join(__dirname, '..', 'Data', 'events.json');

function loadTodoList() {
  try {
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveTodoList(todoList) {
    try {
      const existingData = loadTodoList();
      todoList = todoList.map((task) => ({ id: generateUniqueId(existingData), ...task }));
      existingData.push(...todoList);
      fs.writeFileSync(eventsFilePath, JSON.stringify(existingData, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving todo list:', error);
    }
  }


  function saveTodoLists(updatedData, filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving todo list:', error);
    }
  }

  function generateUniqueId(existingData) {
    const existingIds = existingData.map((user) => user.id);
    let newId;
  
    do {
      newId = Math.floor(Math.random() * 1000) + 1; // Generate a random ID
    } while (existingIds.includes(newId));
  
    return newId;
  }
  
  
function isValidDate(date) {
  const inputDate = new Date(date);
  const currentDate = new Date();

  return !isNaN(inputDate.getTime()) && inputDate >= currentDate;
}

module.exports = {
  loadTodoList,
  saveTodoList,
  saveTodoLists,
  generateUniqueId,
  isValidDate,
};
