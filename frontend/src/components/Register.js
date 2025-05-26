// components/Register.js
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        dateOfBirth: '',
        address: '',
        employeeNumber: '',
        designation: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("user ::", user);
            const response = await fetch('http://10.226.38.83:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            console.log("res :::", response.body)
            if (response.ok) {
                alert('Registration Successful');
            } else {
                alert('Registration Failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} required />
                <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" required />
                <input type="text" name="employeeNumber" value={user.employeeNumber} onChange={handleChange} placeholder="Employee Number" required />
                <input type="text" name="designation" value={user.designation} onChange={handleChange} placeholder="Designation" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
