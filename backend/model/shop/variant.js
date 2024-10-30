const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  type:{
    type:Boolean, //True for weight and False for litre
    required: true,
  },
  color: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Variant', VariantSchema);
