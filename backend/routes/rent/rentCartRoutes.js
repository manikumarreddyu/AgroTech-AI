// routes/cartRoutes.js

const express = require('express');
const { addToCart, viewCart, removeFromCart } = require('../../controllers/rent/RentCartController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// Add to cart
router.post('/addtoCart',authMiddleware, addToCart);

// View cart
router.get('/getCart/:userId',authMiddleware, viewCart);

// Remove from cart
router.delete('/remove/:productId',authMiddleware, removeFromCart);

module.exports = router;
