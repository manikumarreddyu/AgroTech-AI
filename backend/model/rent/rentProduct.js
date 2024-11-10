const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const rentProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: [String], required: true },
    availabilityStatus: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      default: "available",
    },
    rentalPricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    rentalDurationOptions: {
      type: [String],
      required: true,
      enum: ["hourly", "daily", "weekly", "monthly"],
    },
    maxRentalDuration: {
      type: Number,
      required: true,
      min: 1,
    },
    depositAmount: {
      type: Number,
      default: 0,
    },
    rentalTerms: {
      type: String,
      maxlength: 500,
    },
    rentedQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

// Method to update product rating based on reviews
rentProductSchema.methods.updateProductRating = async function () {
  const totalRating = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = this.reviews.length
    ? totalRating / this.reviews.length
    : 0;
  this.rating = averageRating;
  await this.save();
};

const RentProduct =
  mongoose.models.RentProduct ||
  mongoose.model("RentProduct", rentProductSchema);

module.exports = RentProduct;
