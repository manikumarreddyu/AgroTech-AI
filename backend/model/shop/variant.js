const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  additionalPrice: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Variant', VariantSchema);
