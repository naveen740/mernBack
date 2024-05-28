const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, userType } = req.body;
        const newUser = new User({ firstName, lastName, email, phoneNumber, userType });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser };
