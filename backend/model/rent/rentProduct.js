  const mongoose = require('mongoose');

  const reviewSchema = new mongoose.Schema({
    rentalId: String,
    rating: { type: Number, required: true, min: 0, max: 5 }, 
    comment: String, 
  });

  const rentProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Base price for the product (purchase price)
    image: { type: String, required: true },
    category: { type: [String], required: true },
    
  
    availabilityStatus: {
      type: String,
      enum: ['available', 'rented', 'maintenance'],
      default: 'available', 
    },
    
    rentalPricePerDay: { 
      type: Number, 
      required: true, 
      min: 0, // Minimum daily rental price
    },

    rentalDurationOptions: { 
      type: [String], 
      required: true, 
      enum: ['hourly', 'daily', 'weekly', 'monthly'], 
    }, // Available rental durations

    maxRentalDuration: { 
      type: Number, 
      required: true, 
      min: 1, // Minimum rental period (e.g., in days, weeks, etc.)
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
  }, { timestamps: true });

  // Method to update product rating based on reviews
  rentProductSchema.methods.updateProductRating = function() {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = this.reviews.length ? totalRating / this.reviews.length : 0;
    this.rating = averageRating;
    return this.save();
  };

  module.exports = mongoose.models.RentProduct || mongoose.model('RentProduct', rentProductSchema);
