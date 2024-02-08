const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Permette al server di accettare JSON.

// Definisci le tue route qui, esempio:
app.get('/', (req, res) => {
  res.send('Benvenuto al backend del Bandi SaaS!');
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
