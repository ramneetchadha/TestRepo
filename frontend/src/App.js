// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import TaskForm from './components/TaskForm';

import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/task-form" element={<TaskForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
