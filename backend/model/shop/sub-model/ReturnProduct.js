
const mongoose = require('mongoose');

const returnProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    returnDate: {
      type: Date,
      required: true
    },
    condition: {
      type: String,
      enum: ['good', 'damaged'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'returned', 'approved', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReturnProduct', returnProductSchema);
