const express = require("express");
const { check } = require("express-validator");
const { submitReview, getReviews, getRatingDistribution } = require("../../controllers/rent/ReviewControllers");

const router = express.Router();

// Submit a review
router.post(
  "/products/:productId/reviews",
  [
    check("rating", "Rating is required and must be between 0 and 5").isInt({
      min: 0,
      max: 5,
    }),
    check("comment", "Comment is required").not().isEmpty(),
  ],
  submitReview
);

// Get reviews for a product
router.get("/products/:productId/reviews", getReviews);

// Get rating distribution for a product
router.get("/products/:productId/rating-distribution", getRatingDistribution);

module.exports = router;
