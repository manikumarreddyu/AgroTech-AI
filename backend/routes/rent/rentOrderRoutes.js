// routes/productRoutes.js

const express = require('express');
const { OrderConfirmation } = require('../../controllers/rent/RentOrderController');
const router = express.Router();


// Create a new product
router.post('/rent-product', OrderConfirmation);





module.exports = router;
