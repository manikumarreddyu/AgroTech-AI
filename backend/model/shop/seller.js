const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Seller', SellerSchema);
