// components/Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [userData, setUserData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://10.226.38.83:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.ok) {
                setUserData(data);
                console.log("data ::::", data);
                console.log("userData ::::", userData);
                alert('Login Successful');
            } else {
                alert('Login Unsuccessful');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            {userData && (
                <div className="user-details">
                    <h3>User Details</h3>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Designation: {userData.designation}</p>
                    <p>Employee Number: {userData.employeeNumber}</p>
                </div>
            )}
        </div>
    );
};

export default Login;
