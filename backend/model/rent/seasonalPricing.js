const mongoose = require('mongoose');

const seasonalPricingSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'RentProduct', required: true },
    season: { type: String, required: true, enum: ['summer', 'winter', 'fall', 'spring'] },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const SeasonalPricing = mongoose.model('SeasonalPricing', seasonalPricingSchema);

module.exports = SeasonalPricing;
