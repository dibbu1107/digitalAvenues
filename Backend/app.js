const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Router/authRoutes');
const eventRoutes = require('./Router/eventRoutes');
const { verifyToken } = require('./Middleware/authMiddleware');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use(verifyToken);
app.use('/tasks', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
