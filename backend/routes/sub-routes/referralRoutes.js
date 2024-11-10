const express = require("express");
const router = express.Router();
const referralController = require("../controllers/referralController");

// Route to create a new referral
// Endpoint: POST /api/referrals
router.post("/",
     referralController.createReferral);

// Route to check referral status by code
// Endpoint: GET /api/referrals/status/:code
router.get("/status/:code",
     referralController.checkReferralStatus);

// Route to complete a referral when a referral code is used by a referee
// Endpoint: POST /api/referrals/complete
router.post("/complete", 
    referralController.completeReferral);

// Route to get all referrals by a specific referrer, with optional status filter and pagination
// Endpoint: GET /api/referrals/referrer/:referrerId
router.get("/referrer/:referrerId", 
    referralController.getReferralsByReferrer);

// Route for admin to list all referrals with pagination and sorting
// Endpoint: GET /api/referrals
router.get("/",
     referralController.listAllReferrals);

// Route to cancel a pending referral by code
// Endpoint: POST /api/referrals/cancel
router.post("/cancel",
     referralController.cancelReferral);

module.exports = router;
