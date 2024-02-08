const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool with connection details from .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 20,
});

// Verfiy connection to DB
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to DB:', err.stack);
  }
  console.log('Connected to DB successfully'); 
  release(); // Release client back to the pool
});

module.exports = { pool };