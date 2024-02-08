const getAllDocuments = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM documents');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const 
    }
  };
  
  const createDocument = async (req, res) => {
    // Logica per creare un nuovo documento
  };
  
  const updateDocument = async (req, res) => {
    // Logica per aggiornare un documento esistente
  };
  
  const deleteDocument = async (req, res) => {
    // Logica per eliminare un documento
  };
  
  module.exports = {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
  };
  