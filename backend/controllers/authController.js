const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await User.getAccountEmail(email);
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' }); 
        }
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            console.log('Password does not match for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const registerUser = async (req, res) => {
    const {accID, name, contactNo, password, email } = req.body;
    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: 'Email registered with a different account'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(null, name, contactNo, password, email);
    const createdUser = await User.createdUser(newUser);

    const token = jwt.sign({ id: createdUser.accID}, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.status(201).json({ message: 'User created successfully', token});
    } catch (err){
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error'});
    }
};

module.exports = {
    loginUser,
    registerUser,
};
  