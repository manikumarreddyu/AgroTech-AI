const mongoose = require('mongoose');

// Define schema for tracking rental analytics
const analyticsSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'RentProduct' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rentalDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  rentalDuration: { type: String },
  status: {
    type: String,
    enum: ['ongoing', 'returned', 'cancelled', 'approved', 'rejected'],
  },
  rating: { type: Number, min: 0, max: 5 },
  revenue: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
