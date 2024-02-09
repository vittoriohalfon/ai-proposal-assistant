const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

    if (token == null) return res.sendStatus(401); // If no token, then unauthorized

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.sendStatus(403); // Token is no longer valid
        } 
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };