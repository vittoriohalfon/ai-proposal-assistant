const { pool } = require('../config/dbConfig');

// Logic to retrieve all docs
const getAllDocuments = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM documents');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Logic to retrieve specific document by ID
  const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM documents WHERE id = $1', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Logic to create new doc
  const createDocument = async (req, res) => {
    const { documentName, userId } = req.body;
    const documentPath = req.file.path;

    try {
        const { rows } = await pool.query(
            'INSERT INTO documents (user_id, document_name, document_path) VALUES ($1, $2, $3) RETURNING *;',
            [userId, documentName, documentPath]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { documentName } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE documents SET document_name = $1 WHERE id = $2 RETURNING *;',
            [documentName, id]
        );
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  const deleteDocument = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM documents WHERE id = $1;', [id]);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
  };
  