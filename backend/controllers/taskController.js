const taskService = require('../services/taskService');

const getAllTasks = async (req, res, next) => {
    try {
        const { completed, sort } = req.query;
        let tasks;
        if (completed !== undefined) {
            tasks = await taskService.getTasksByCompleted(completed === 'true', req.user._id);
        } else if (sort === 'newest') {
            tasks = await taskService.getNewestTasks(req.user._id);
        } else {
            tasks = await taskService.getAllTasks(req.user._id);
        }
        res.json(tasks);
    } catch(err) {
        next(err);
    }
}

const getTaskById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await taskService.getTaskById(id, req.user._id);
        if(!result.success && result.reason === 'notFound') {
            return res.status(404).json({
                message: 'Task not found',
            })
        }
        if(!result.success && result.reason === 'forbidden') {
            return res.status(403).json({
                message: 'Not authorized to view this task',
            })
        }
        res.json(result.task);
    } catch(err) {
        next(err);
    }
}

const createTask = async (req, res, next) => {
    try {
    const {title, priority} = req.body || {};

    const newTask = await taskService.createTask(title, priority, req.user._id);

    res.status(201).json(newTask);
    } catch(err) {
        next(err);
    }
}

const updateTaskById = async (req, res, next) => {
    try {
    const id = req.params.id;

    const {title, completed} = req.body || {};

    const result = await taskService.updateTaskById(id, title, completed, req.user._id);

     if(!result.success && result.reason === 'notFound') {
        return res.status(404).json({
            message: 'Task not found',
        })
     }
     if(!result.success && result.reason === 'forbidden') {
        return res.status(403).json({
            message: 'Not authorized to update this task',
        })
     }
    res.json(result.task);
    } catch(err) {
        next(err);
    }
}

const deleteTaskById = async (req, res, next) => {
    try {
    const id = req.params.id;
    const result = await taskService.deleteTaskById(id, req.user._id);

    if(!result.success && result.reason === 'notFound' ) {
        return res.status(404).json({
            message: 'Task not found',
        })
    }
    if(!result.success && result.reason === 'forbidden') {
        return res.status(403).json({
            message: 'Not authorized to delete this task'
        })
    }
    res.status(204).send();
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
}