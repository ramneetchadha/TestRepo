// components/TaskForm.js
import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        assignor: '',
        assignee: '',
        status: 'open', // Default status
    });

    const [tasks, setTasks] = useState([]); // For displaying tasks

    useEffect(() => {
        // Fetch existing tasks
        const fetchTasks = async () => {
            try {
                console.log("hetching......")
                const response = await fetch('http://10.226.38.83:5000/api/tasks', {method: 'GET', headers: { 'Content-Type': 'application/json' }});
                // console.log("response :::", response);
                const data = await response.json();
                // console.log("data ::::", data);
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.226.38.83:5000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks((prevTasks) => [...prevTasks, newTask.task]);
                alert('Task created successfully');
            } else {
                alert('Error creating task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="task-form-container">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Task Description"
                    required
                ></textarea>
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="assignor"
                    value={task.assignor}
                    onChange={handleChange}
                    placeholder="Assignor (Enter Name)"
                    required
                />
                <input
                    type="text"
                    name="assignee"
                    value={task.assignee}
                    onChange={handleChange}
                    placeholder="Assignee (Enter Name)"
                    required
                />
                <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    required
                >
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">Create Task</button>
            </form>

            <h2>Existing Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Assignor</th>
                        <th>Assignee</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.duedate}</td>
                            <td>{task.assignor}</td>
                            <td>{task.assignee}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskForm;
