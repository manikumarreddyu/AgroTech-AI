const express = require('express');
const router = express.Router();
const Analytics = require('../../model/rent/Analytics');
const RentProduct = require('../../model/rent/rentProduct');
const { productPerformance, rentalInsights, rentalStats, topCustomers } = require('../../controllers/rent/AnalyticsController');


// Calculate total rentals, revenue, and rating for a product
router.get('/product-performance/:productId', productPerformance );

// Fetch rental insights by user
router.get('/user-insights/:userId', rentalInsights);

// Fetch rental statistics over time (e.g., weekly, monthly)
router.get('/rental-trends', rentalStats );

// Aggregate customer insights (top customers, most rentals, etc.)
router.get('/top-customers', topCustomers);

// Function to log analytics on rental creation or update
async function logRentalAnalytics(rental) {
  try {
    // Fetch the product to get rental price
    const product = await RentProduct.findById(rental.product);
    if (!product) {
      throw new Error("Product not found for rental analytics logging");
    }

    // Calculate revenue based on rental quantity and price
    const revenue = rental.quantity * product.rentalPricePerDay;

    // Create analytics record
    await Analytics.create({
      productId: rental.product,
      userId: rental.userId,
      rentalDate: rental.rentalDate,
      returnDate: rental.returnDate,
      rentalDuration: rental.rentalDuration,
      status: rental.status,
      rating: rental.rating || null,
      revenue: revenue,
    });
    console.log("Rental analytics logged successfully");

  } catch (error) {
    console.error("Failed to log rental analytics:", error);
  }
}

module.exports = router;
