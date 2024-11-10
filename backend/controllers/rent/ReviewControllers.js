const { validationResult } = require("express-validator");
const RentProduct = require("../../model/rent/rentProduct");
const winston = require("winston");

// Logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: 'info',
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Controller for submitting a review
exports.submitReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const { userId } = req.user; // Assuming user is authenticated and userId is available in req.user

  // Validation check for rating and comment
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = await RentProduct.findById(productId);
    if (!product) {
      logger.error(`Product with id ${productId} not found`);
      return res.status(404).json({ msg: "Product not found" });
    }

    // Create new review object
    const newReview = { userId, rating, comment };

    // Add review to the product
    product.reviews.push(newReview);

    // Update product rating based on the new reviews
    await product.updateProductRating();

    // Save the product with the new review
    await product.save();

    logger.info(`Review submitted successfully for product ${productId}`);
    res.status(201).json({ msg: "Review submitted successfully" });
  } catch (error) {
    logger.error(`Error submitting review: ${error.message}`);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Controller for fetching all reviews of a product with pagination and sorting
exports.getReviews = async (req, res) => {
  const { productId } = req.params;
  const { page = 1, limit = 10, order_by = "createdAt" } = req.query;

  try {
    const product = await RentProduct.findById(productId);
    if (!product) {
      logger.error(`Product with id ${productId} not found`);
      return res.status(404).json({ msg: "Product not found" });
    }

    // Aggregate and fetch reviews based on pagination and sorting
    const reviews = await RentProduct.aggregate([
      { $match: { _id: productId } },
      { $unwind: "$reviews" },
      { $sort: { [`reviews.${order_by}`]: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      { $project: { reviews: 1 } },
    ]);

    if (reviews.length === 0) {
      logger.warn(`No reviews found for product ${productId}`);
      return res.status(404).json({ msg: "No reviews found" });
    }

    res.json(reviews);
  } catch (error) {
    logger.error(`Error fetching reviews: ${error.message}`);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Controller for fetching rating distribution of a product
exports.getRatingDistribution = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await RentProduct.findById(productId);
    if (!product) {
      logger.error(`Product with id ${productId} not found`);
      return res.status(404).json({ msg: "Product not found" });
    }

    // Aggregate to count the number of ratings for each score (1-5)
    const ratingDistribution = await RentProduct.aggregate([
      { $match: { _id: productId } },
      { $unwind: "$reviews" },
      { $group: { _id: "$reviews.rating", count: { $sum: 1 } } },
      { $project: { rating: "$_id", count: 1, _id: 0 } },
      { $sort: { rating: 1 } },
    ]);

    // Fill in missing ratings (e.g., if no 1-star ratings, we still show 0)
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingDistribution.forEach((entry) => {
      distribution[entry.rating] = entry.count;
    });

    res.json(distribution);
  } catch (error) {
    logger.error(`Error fetching rating distribution: ${error.message}`);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
