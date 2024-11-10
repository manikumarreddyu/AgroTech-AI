// routes/productRoutes.js

const express = require('express');
const { OrderConfirmation, getOrderHistory, reRent, generateReceipt } = require('../../controllers/rent/RentOrderController');
const router = express.Router();


// Create a new product
router.post('/rent-product', OrderConfirmation);
//Get product rental history
router.get('/rent-product/history', getOrderHistory );
// Re-rent a previously rented item
router.post('rent-product/re-rent/:rentalId', reRent );
// Generate detailed rental receipt
router.get('rent-product/receipt/:rentalId', generateReceipt);







module.exports = router;
