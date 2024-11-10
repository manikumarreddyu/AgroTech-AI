// routes/wishlistRoutes.js

const express = require('express');
const wishlistController = require('../../controllers/rent/RentWishlistController');
const authMiddleware = require('../../middleware/authMiddleware');


const router = express.Router();

// Add to Wishlist
router.post('/wishlist/add/:productId',authMiddleware,   wishlistController.addToWishlist);

// Remove from Wishlist
router.delete('/wishlist/remove/:productId',authMiddleware,   wishlistController.removeFromWishlist);

// Get Wishlist
router.get('/wishlist',authMiddleware, wishlistController.getWishlist);

module.exports = router;
