const express = require("express");
const loyaltyPointsController = require("../../controllers/shop/sub-controllers/loyaltyPointsController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to check valid user

const router = express.Router();

// Route to award points to a user
router.post(
  "/api/loyalty-points",
  authMiddleware,
  loyaltyPointsController.awardPoints
);

// Route to get a user's total loyalty points
router.get(
  "/api/loyalty-points/:userId",
  authMiddleware,
  loyaltyPointsController.getPoints
);

// Route to get a user's transaction history of loyalty points
router.get(
  "/api/loyalty-points/:userId/history",
  authMiddleware,
  loyaltyPointsController.getTransactionHistory
);

// Route to delete a specific loyalty points transaction
router.delete(
  "/api/loyalty-points/:transactionId",
  authMiddleware,
  loyaltyPointsController.deletePoints
);

// Route to update a specific loyalty points transaction
router.put(
  "/api/loyalty-points/:transactionId",
  authMiddleware,
  loyaltyPointsController.updatePoints
);

// Route to filter transactions by type (e.g., 'purchase', 'referral')
router.get(
  "/api/loyalty-points/:userId/filter",
  authMiddleware,
  loyaltyPointsController.filterTransactionsByType
);

// Route to get total points earned through referrals
router.get(
  "/api/loyalty-points/:userId/referrals",
  authMiddleware,
  loyaltyPointsController.getPointsByReferrals
);

// Route to get total points earned through purchases
router.get(
  "/api/loyalty-points/:userId/purchases",
  authMiddleware,
  loyaltyPointsController.getPointsByPurchases
);

// Route to redeem points
router.post(
  "/api/loyalty-points/redeem",
  authMiddleware,
  loyaltyPointsController.redeemPoints
);

// Route to get loyalty points summary (overall points, referral points, and purchase points)
router.get(
  "/api/loyalty-points/:userId/summary",
  authMiddleware,
  loyaltyPointsController.getLoyaltySummary
);

module.exports = router;
