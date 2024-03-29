const { pool } = require('../config/dbConfig');

// Logic to retrieve all docs
const getAllDocuments = async (req, res) => {

    const userId = req.user.id;

    try {
        const { rows } = await pool.query('SELECT * FROM documents WHERE user_id = $1', [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Logic to retrieve specific document by ID
  const getDocumentById = async (req, res) => {
    const { id } = req.params; // Get document ID from URL
    const userId = req.user.id; // Get user ID from JWT token

    try {
        const { rows } = await pool.query('SELECT * FROM documents WHERE id = $1 AND user_id = $2', [id, userId]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Document not found or access denied' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Logic to create new doc
  const createDocument = async (req, res) => {
    const documentName = req.body.documentName;
    const userId = req.user.id;
    const documentPath = req.file.path;

    // Check if document name is provided
    if (!documentName) {
        return res.status(400).json({ error: 'Document name is required' });
    }

    // Insert new document into DB
    try {
        const { rows } = await pool.query(
            'INSERT INTO documents (user_id, document_name, document_path) VALUES ($1, $2, $3) RETURNING id;',
            [userId, documentName, documentPath]
        );
        res.status(201).json({ message: "File uploaded successfully", documentId: rows[0].id, filePath: documentPath});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Logic to update a document
  const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { documentName } = req.body;
    
    // Update document in DB
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
  
  // Logic to delete a document
  const deleteDocument = async (req, res) => {
    const { id } = req.params;
    
    // Delete document from DB
    try {
        await pool.query('DELETE FROM documents WHERE id = $1;', [id]);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };
  
  // Export functions
  module.exports = {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
  };
  