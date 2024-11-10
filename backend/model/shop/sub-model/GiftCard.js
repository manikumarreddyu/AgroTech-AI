
const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
    min: 0.01,
  },
  status: {
    type: String,
    enum: ['active', 'redeemed', 'expired'],
    default: 'active',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

module.exports = GiftCard;
