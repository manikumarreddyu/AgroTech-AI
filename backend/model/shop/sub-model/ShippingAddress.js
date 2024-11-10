
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingAddressSchema = new Schema({
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // assuming a 'User' model exists for users
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ShippingAddress', ShippingAddressSchema);
