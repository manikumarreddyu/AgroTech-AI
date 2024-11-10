
const express = require('express');
const router = express.Router();

// Import the GiftCard Controller
const GiftCardController = require('../../controllers/shop/sub-controllers/giftCardController');

// Middleware to validate gift cards (to check status, expiry, etc.)
const validateGiftCard = require('../../middleware/sub-ware/giftCardMiddleware');

// Route to create a new gift card
router.post('/api/gift-cards', GiftCardController.createGiftCard);

// Route to get details of a specific gift card by card number
router.get('/api/gift-cards/:cardNumber', GiftCardController.getGiftCardDetails);

// Route to redeem a gift card by card number
router.post('/api/gift-cards/redeem', validateGiftCard, GiftCardController.redeemGiftCard);

// Route to fetch all gift cards for a user (e.g., list of user's gift cards)
router.get('/api/gift-cards/user/:userId', GiftCardController.getUserGiftCards);

// Route to search gift cards within a specific value range
router.get('/api/gift-cards/search', GiftCardController.searchGiftCardsByValue);

// Route to delete a gift card (forceful deletion)
router.delete('/api/gift-cards/:cardNumber', GiftCardController.deleteGiftCard);

// Route to deactivate (expire) a gift card before redemption
router.patch('/api/gift-cards/deactivate/:cardNumber', GiftCardController.deactivateGiftCard);

// Route to fetch all gift cards (Admin-only route)
router.get('/api/gift-cards', GiftCardController.getAllGiftCards);

// Route to get statistics on redeemed gift cards
router.get('/api/gift-cards/stats', GiftCardController.getGiftCardStats);

module.exports = router;
