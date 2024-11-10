const express = require("express");

const { accumulatePoints, redeem, referral, pointRewards } = require("../../controllers/rent/RewardsController");

const router = express.Router();

// 1. Accumulate Points on Rental
router.post("/rentals/:rentalId/complete", accumulatePoints);

// 2. Redeem Points for Rewards
router.post("/redeem", redeem);

// 3. Referral Tracking and Points Award
router.post("/referral", referral);

// 4. Get User Points and Rewards
router.get("/points-rewards", pointRewards );

module.exports = router;
