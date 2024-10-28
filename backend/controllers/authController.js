const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await Account.getAccountByEmail(email);
        console.log("Success");
        if (!user) {
            console.log('Account not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' }); // Make sure to return JSON
        }
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            console.log('Password does not match for the account:', email);
            return res.status(401).json({ message: 'Invalid credentials' }); // Make sure to return JSON
        }
        console.log('User logged in successfully:', email);
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' }); // Make sure to return JSON
    }
};

const registerUser = async (req, res) => { 
    const { accID, name, contactNo, password, email } = req.body;
    console.log(contactNo);
    try { 
        const existingAccount = await Account.getAccountByEmail(email); 
        if (existingAccount) { 
            return res.status(400).json({message: 'Email registered with a different account'}); 
    } 
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newAccount = new Account(accID, name, contactNo, hashedPassword, email); 
    const createdAccount = await Account.registerAccount(newAccount); 
 
    const token = jwt.sign({ id: createdAccount.accID}, process.env.JWT_SECRET, { expiresIn: '200s'}); 
    res.status(201).json({ message: 'User created successfully', token}); 
    } catch (err){ 
    console.error('Error during registration:', err); 
    res.status(500).json({ message: 'Internal server error'}); 
    } 
}; 
 
module.exports = {loginUser,registerUser};
  