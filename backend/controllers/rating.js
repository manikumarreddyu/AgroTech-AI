
const Rating = require('../model/rating.js')

exports.submitRating = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const newRating = new Rating({
      user: req.userId, // User ID from token middleware
      rating,
      comment
    });

    await newRating.save();
    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Rating submission error:", error);
    res.status(500).json({ message: "Could not submit rating" });
  }
};
