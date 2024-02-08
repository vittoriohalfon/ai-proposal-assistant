const { body } = require('express-validator');
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Inserisci un indirizzo email valido'),
    body('password').isLength({ min: 6 }).withMessage('La password deve essere di almeno 6 caratteri'),
    body('company_name').not().isEmpty().withMessage('Il nome dell\'azienda è richiesto')
], registerUser);

router.post('/login', loginUser);

module.exports = router;
