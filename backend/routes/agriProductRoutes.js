// routes/agriProductRoutes.js
const express = require('express');
const router = express.Router();
const agriProductController = require('../controllers/agriProductController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all products
router.get('/', agriProductController.getAllProducts);

// Get product by ID
router.get('/:id', agriProductController.getProductById);

// Create a new product (only authenticated users can create)
router.post('/', authMiddleware, agriProductController.createProduct);

// Update a product (only authenticated users can update)
router.put('/:id', authMiddleware, agriProductController.updateProduct);

// Delete a product (only authenticated users can delete)
router.delete('/:id', authMiddleware, agriProductController.deleteProduct);

module.exports = router;
