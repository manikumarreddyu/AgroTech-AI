// routes/cartRoutes.js

const express = require('express');
const { addToCart, viewCart, removeFromCart } = require('../../controllers/rent/RentCartController');

const router = express.Router();

// Add to cart
router.post('/addtoCart', addToCart);

// View cart
router.get('/getCart/:userId', viewCart);

// Remove from cart
router.delete('/remove/:productId', removeFromCart);

module.exports = router;
