const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'Data', 'users.json');

function loadUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

function generateUniqueId(users) {
  const existingIds = users.map((user) => user.id);
  let newId;

  do {
    newId = Math.floor(Math.random() * 1000) + 1; 
  } while (existingIds.includes(newId));

  return newId;
}

module.exports = {
  loadUsers,
  saveUsers,
  generateUniqueId,
};
