const express = require('express');
const { fetchAndStoreContracts } = require('../controllers/contractController');
const router = express.Router();

router.get('/fetch-store', fetchAndStoreContracts);

module.exports = router;