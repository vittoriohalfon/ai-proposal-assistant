const { pool } = require('../config/dbConfig');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Logic to register a new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into DB
    try {
        const { rows } = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Check if user exists
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (rows.length > 0) {
            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                //Generate JWT Token (SECRET_KEY in .env)
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  };
  
  // Export the functions
  module.exports = {
    registerUser,
    loginUser
  };
  