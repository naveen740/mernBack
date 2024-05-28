const express = require('express');
const router = express.Router();
const User =require('../models/User')
const { registerUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

// Fetch user profile
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, userType } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.userType = userType || user.userType;

        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', registerUser);

module.exports = router;
