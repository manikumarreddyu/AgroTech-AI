// models/Product.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rentalId: String,
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: String,
});

const rentProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  category: { type: [String], required: true },
  reviews: [reviewSchema],  // Nested schema for reviews
}, { timestamps: true });

module.exports = mongoose.models.RentProduct || mongoose.model('RentProduct', rentProductSchema);
