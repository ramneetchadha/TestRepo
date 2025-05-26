import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://10.226.38.83:5000/api/tasks', {
        headers: { Authorization: token },
      });
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.title}</li>
      ))}
    </ul>
  );
}

export default TaskList;
