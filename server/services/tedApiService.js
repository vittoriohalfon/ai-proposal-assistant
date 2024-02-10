const axios = require('axios');
const TED_API_BASE_URL = 'https://ted.europa.eu/api/v1.0';

const searchContracts = async (searchParams) => {
    try {
        const response = await axios.get(`${TED_API_BASE_URL}/notices/search`, { params: searchParams });
        return response.data;
    } catch (error) {
        console.error('Error fetching contracts from TED:', error);
        throw error;
    }
};

module.exports = { searchContracts };