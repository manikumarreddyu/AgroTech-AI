const express = require('express');
const { createPromotion, getActivePromotions, deactivatePromotion } = require('../../controllers/rent/promotionController');
const router = express.Router();


// Admin routes to manage promotions
router.post('/rent/create',  createPromotion); // Create new promotion
router.get('/rent/active', getActivePromotions); // Get active promotions
router.put('/rent/deactivate/:promotionId', deactivatePromotion); // Deactivate a promotion

module.exports = router;
