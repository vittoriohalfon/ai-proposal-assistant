const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Middleware to analyse json request

// Definizione routes,:
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack, // hides stack trace in production
        },
    });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
