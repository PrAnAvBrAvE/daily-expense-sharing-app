const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register User
router.post('/api/register', async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, mobile, password: hashedPassword });
    
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'User registration failed', error });
    }
});

// Login User
router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
});

// Fetch Users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
