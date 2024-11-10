const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    applicableProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "RentProduct" },
    ], // Specific products or categories for the promo
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
