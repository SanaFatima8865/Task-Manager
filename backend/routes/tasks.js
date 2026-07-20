const express = require('express');
const router = express.Router();
const validateTask = require('../middleware/validateTask');
const protect = require('../middleware/auth');
const {getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById} = require('../controllers/taskController');

router.get('/', protect, getAllTasks);

router.get('/:id', protect, getTaskById);

router.post('/', protect, validateTask, createTask);

router.put('/:id', protect, updateTaskById);

router.delete('/:id', protect, deleteTaskById);

module.exports = router;