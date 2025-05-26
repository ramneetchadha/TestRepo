// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('name email');
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching users', error: error.message });
    }
});

module.exports = router;
