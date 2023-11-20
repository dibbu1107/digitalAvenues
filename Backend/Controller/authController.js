const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateUniqueId, loadUsers, saveUsers } = require('../Utils/usersUtils');

// Registration logic
const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const existingUsers = loadUsers(); // Load users from the file
  const existingUser = existingUsers.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newId = generateUniqueId(existingUsers);

  const newUser = { id: newId, username, password: hashedPassword };
  existingUsers.push(newUser);
  saveUsers(existingUsers);

  res.json({ success: true, message: 'Registration successful', user: newUser });
};

// Login logic
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const users = loadUsers(); // Load users from the file
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '1h' });
  console.log('Token generated:', token);

  res.json({ success: true, message: 'Login successful', token });
};

module.exports = { register, login };
