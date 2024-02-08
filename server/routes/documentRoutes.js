const { body } = require('express-validator');
const express = require('express');
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');

const router = express.Router();

router.post('/', [
    body('documentName').not().isEmpty().withMessage('Il nome del documento è richiesto'),
], createDocument);

router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;