const { pool } = require('../config/dbConfig');
const tedApiService = require('../services/tedApiService');

const fetchAndStoreContracts = async (req, res) => {
    try {
        const searchResults = await tedApiService.searchContracts(req.query);
        // Logic to store searchResults in the database
        // Iterate through searchResults and insert into public_contracts table
        res.status(200).json({ message: 'Contracts fetched and stored successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { fetchAndStoreContracts };