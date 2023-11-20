const express = require('express');
const router = express.Router();
const { getTasks, addTask, deleteTask, markTaskAsDone } = require('../Controller/eventController');

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.put('/:id', markTaskAsDone);

module.exports = router;
