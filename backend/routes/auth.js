const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Register User
router.post('/register', registerUser);
// router.post('/register', async (req, res) => {
//     console.log("yeeeeeeeeee");
//     try {
//         //const User = require('../models/user/User')(req.dbUser);
//         register(req, res, User);
//     } catch (err) {
//         res.status(500).json({ msg: 'Error registering user' });
//     }
// });

// Login User
router.post('/login', loginUser);
    // async (req, res) => {
    //try {
     //   const User = require('../models/user/User')(req.db);
     //   await login(req, res, User);
    //} catch (err) {
     //   res.status(500).json({ msg: 'Error logging in user' });
    //}
//});

module.exports = router;
