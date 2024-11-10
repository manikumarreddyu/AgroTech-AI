const mongoose = require("mongoose");

const loyaltyPointSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  earnedBy: {
    type: String,
    enum: ["purchase", "referral"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LoyaltyPoint", loyaltyPointSchema);
