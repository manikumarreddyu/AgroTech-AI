// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../../controllers/rent/RentProductController');

// Create a new product
router.post('/rent-products', productController.createProduct);

// Get all products
router.get('/rent-products', productController.getAllProducts);

// Get a single product by ID
router.get('/rent-products/:id', productController.getProductById);

// Update a product by ID
router.put('/rent-products/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/rent-products/:id', productController.deleteProduct);



router.get('/filtered-rent-products', productController.getFilteredProducts );




module.exports = router;
