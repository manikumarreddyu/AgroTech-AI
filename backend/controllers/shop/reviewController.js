const mongoose = require('mongoose');
const Review = require('../../model/shop/review');
const Product = require('../../model/shop/product');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('product');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: 'Invalid review ID' });
    }

    const review = await Review.findById(reviewId).populate('product');
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new review
exports.createReview = async (req, res) => {
  const { product,user, rating, comment } = req.body; // User is removed from here
  try {
    // Step 1: Validate the product
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 2: Create and save the review without checking for existing reviews
    const review = new Review({ product,user, rating, comment });
    const savedReview = await review.save();

    // Step 3: Add the review to the product's reviews array
    existingProduct.reviews.push(savedReview._id);
    await existingProduct.save();

    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  const reviewId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ error: 'Invalid review ID' });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ error: "Review not found" });

    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ error: 'Invalid review ID' });
  }

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    // Remove review from associated product
    await Product.findByIdAndUpdate(
      review.product,
      { $pull: { reviews: review._id } }, // Remove review from product's reviews array
      { new: true }
    );

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
