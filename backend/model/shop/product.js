const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
    min: 0,
  },
  images: { // Changed to an array of strings for multiple images
    type: [String],
    required: true,
    validate: [arrayLimit, 'Exceeds the limit of 3 images']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  variants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
  }],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  }
}, { timestamps: true });

// Validator function to limit the number of images
function arrayLimit(val) {
  return val.length <= 3;
}

module.exports = mongoose.model('Product', ProductSchema);
