const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 20,
});

// Verifica la connessione al database
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Errore di connessione al database:', err.stack);
  }
  console.log('Connesso al database PostgreSQL!');
  release(); // Assicurati di rilasciare il client dopo aver verificato la connessione
});

module.exports = { pool };