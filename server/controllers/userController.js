const { pool } = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {

    }
  };
  
  const loginUser = async (req, res) => {
    // Implementa la logica di login
    res.send('Login utente');
  };
  
  module.exports = {
    registerUser,
    loginUser
  };
  