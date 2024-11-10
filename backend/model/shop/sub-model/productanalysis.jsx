const mongoose = require('mongoose');

const productAnalysisSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: [String],
    default: [],
  },
});

const ProductAnalysis = mongoose.model('ProductAnalysis', productAnalysisSchema);

module.exports = ProductAnalysis;
