// routes/wishlistRoutes.js

const express = require('express');
const wishlistController = require('../../controllers/rent/RentWishlistController');


const router = express.Router();

// Add to Wishlist
router.post('/wishlist/add/:productId',  wishlistController.addToWishlist);

// Remove from Wishlist
router.delete('/wishlist/remove/:productId',  wishlistController.removeFromWishlist);

// Get Wishlist
router.get('/wishlist',wishlistController.getWishlist);

module.exports = router;
