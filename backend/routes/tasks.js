const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');
const getTaskModel = require('../models/task/Task');
const connectTaskDB = require('../config/dbTask');


// Create Task
router.post('/', async (req, res) => {
    const { title, description, dueDate, assignor, assignee, status } = req.body;

    if (!title || !description || !dueDate || !assignor || !assignee || !status) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const connection = await connectTaskDB();
        const Task = getTaskModel(connection);
        console.log("task :::", req.body)
        const newTask = new Task({ title, description, dueDate, assignor, assignee, status });
        await newTask.save();
        console.log(newTask)
        res.status(201).json({ msg: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

const getAllTasks = async (req, res) => {
    console.log("getAllTasks");
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow frontend origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try {
        const connection = await connectTaskDB();
        const Task = getTaskModel(connection);
        // const tasks = await Task.find();
        // console.log(tasks);
        // res.json(tasks);
        Task.find()
        .then(tasks => {
            tasks.forEach(task => {
                if (task.duedate) {
                    if (task.duedate instanceof Date) {
                        task.duedate = task.duedate.toISOString(); // Converts Date object to ISO string
                    } else if (typeof task.duedate === "object") {
                        task.duedate = new Date(task.duedate).toISOString(); // Handles cases where dueDate is an object
                    }
                } else {
                    console.warn(`Task with ID ${task._id} has no dueDate`);
                    task.dueDate = ""; // Assign a default value or handle missing dueDate
                }
            });
            res.status(200).json(tasks); // Send tasks as JSON response
        })
        .catch(error => {
            console.error('Error fetching tasks:', error.message); // Log error
            res.status(500).json({ error: 'Error fetching tasks' }); // Send error response
        })
        .finally(() => {
            connection.close(); // Ensure the database connection is closed
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching tasks', error: error.message });
    }
};

// Get All Tasks
router.get('/', getAllTasks);

// Update Task (Protected Route)
router.patch('/:id', authMiddleware, async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const Task = require('../models/task/Task')(req.db); // Task model connected to TaskDB
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to update this task' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Error updating task', error: err.message });
    }
});

// Get Task By ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignor assignee', 'name email');
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching task', error: err.message });
    }
});

// Delete Task (Protected Route)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const Task = require('../models/task/Task')(req.db); // Task model connected to TaskDB
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to delete this task' });
        }

        await task.remove();
        res.json({ msg: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Error deleting task', error: err.message });
    }
});

module.exports = {router, getAllTasks};
