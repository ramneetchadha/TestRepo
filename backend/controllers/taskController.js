// controllers/taskController.js
const Task = require('../models/task/Task');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignor, assignee } = req.body;

        // Validate fields
        if (!title || !description || !dueDate || !assignor || !assignee) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            assignor,
            assignee,
        });

        await newTask.save();
        res.status(201).json({ msg: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ msg: 'Error creating task', error: error.message });
    }
};

// Fetch all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching tasks', error: error.message });
    }
};

module.exports = { createTask, getTasks };
