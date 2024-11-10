const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'RentProduct', required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredProductSchema);

module.exports = FeaturedProduct;
