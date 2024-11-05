// models/Product.js

const mongoose = require('mongoose');

const rentProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  category: {
    type: [String],
    required: true,
  }
}, { timestamps: true });

// Avoid OverwriteModelError by checking if 'Product' model is already registered
module.exports = mongoose.models.RentProduct || mongoose.model('RentProduct', rentProductSchema);
