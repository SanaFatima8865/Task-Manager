const Task = require('../models/Task');

const getAllTasks = async(owner) => {
    const tasks = await Task.find({owner});
    return tasks;
}

const getTasksByCompleted = async(completed, owner) => {
    const tasks = await Task.find({completed, owner});
    return tasks;
}

const getNewestTasks = async(owner) => {
    const tasks = await Task.find({owner}).sort({createdAt: -1});
    return tasks;
}

const getTaskById = async (id, ownerId) => {
    const task = await Task.findById(id);
    if(!task) {
        return { success: false, reason: 'notFound' };
    }
    if(task.owner.toString() !== ownerId.toString()) {
        return { success: false, reason: 'forbidden' };
    }
    return { success: true, task };
}

const createTask = async (title, priority, owner) => {
    const newTask = new Task({ title, priority, owner });
    const savedTask = await newTask.save();
    return savedTask;
}

const updateTaskById = async (id, title, completed, ownerId) => {
    const task = await Task.findById(id);
    if(!task) {
        return { success: false, reason: 'notFound' };
    }
    if(task.owner.toString() !== ownerId.toString()) {
        return { success: false, reason: 'forbidden' };
    }
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    await task.save();
    return { success: true, task };
}

const deleteTaskById = async (id, ownerId) => {
    const task = await Task.findById(id);
    if(!task) {
        return {
            success: false, reason: 'notFound'
        };
    }
    if(task.owner.toString() !== ownerId.toString()) {
        return {
            success: false, reason: 'forbidden'
        }
    }
    await task.deleteOne();
    return {success: true}
}

module.exports = {
    getAllTasks,
    getTasksByCompleted,
    getNewestTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
}