const express = require('express');
const { featureProduct, getFeaturedProducts } = require('../../controllers/rent/featuredProductController');
const router = express.Router();


// Admin route to feature a product
router.post('rent/feature',featureProduct);

// Get all featured products
router.get('rent/featured',getFeaturedProducts);

module.exports = router;
