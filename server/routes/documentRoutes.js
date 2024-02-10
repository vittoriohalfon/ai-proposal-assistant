const { body } = require('express-validator');
const express = require('express');
const multer = require('multer');
const { authenticateToken } = require('../middlewares/authenticateToken');
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');

const router = express.Router();
const upload = multer ({ dest: 'uploads/' });

router.post('/upload', authenticateToken, upload.single('document'), createDocument);

router.post('/', [
    body('documentName').not().isEmpty().withMessage('Il nome del documento è richiesto'),
], createDocument);

router.get('/', authenticateToken, getAllDocuments);
router.get('/:id', authenticateToken, getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;