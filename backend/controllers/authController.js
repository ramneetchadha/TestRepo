// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/user/User');
const authMiddleware = require('../middleware/authMiddleware');

exports.registerUser = async (req, res) => {
    console.log("req ::", req.body)
    const { name, email, password, dateOfBirth, address, employeeNumber, designation } = req.body;

    if (!name || !email || !password || !dateOfBirth || !address || !employeeNumber || !designation) {
        console.log("all fields....")
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Check if email already exists
        console.log("body ::", req.body)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            address,
            employeeNumber,
            designation,
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully hello ' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Check if email already exists
        console.log("body ::", req.body)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const auhenticatedUser = await User.findOne({ password });
            if(auhenticatedUser){
                console.log("authuser ::::", auhenticatedUser);
                const userDetails = {
                    'name': auhenticatedUser.name,
                    'dateOfBirth': auhenticatedUser.dateOfBirth,
                    'email': auhenticatedUser.email,
                    'address': auhenticatedUser.address,
                    'employeeNumber': auhenticatedUser.employeeNumber,
                    'designation': auhenticatedUser.designation,
                    'msg': 'successfull'
                }
                return res.status(200).json(userDetails);
            }
            return res.status(403).json({ msg: 'notSuccessfull' });
        } else {
            return res.status(404).json({ msg: 'No User' });
        }

    } catch (error) {
        console.error('Error loging user:', error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};
