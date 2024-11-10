const express = require('express');
const { applySeasonalPricing } = require('../../controllers/rent/SeasonalPricingController');
const router = express.Router();



// Admin route to apply seasonal pricing
router.post('/apply',  applySeasonalPricing);

module.exports = router;
