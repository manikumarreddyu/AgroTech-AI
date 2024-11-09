// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../../controllers/rent/RentProductController');
const authMiddleware = require('../../middleware/authMiddleware');

// Create a new product
router.post('/rent-products',authMiddleware, productController.createProduct);

// Get all products
router.get('/rent-products',authMiddleware, productController.getAllProducts);

// Get a single product by ID
router.get('/rent-products/:id',authMiddleware, productController.getProductById);

// Update a product by ID
router.put('/rent-products/:id',authMiddleware, productController.updateProduct);

// Delete a product by ID
router.delete('/rent-products/:id',authMiddleware, productController.deleteProduct);



router.get('/filtered-rent-products',authMiddleware, productController.getFilteredProducts );




module.exports = router;
