// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    employeeNumber: { type: String, unique: true, required: true },
    designation: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
