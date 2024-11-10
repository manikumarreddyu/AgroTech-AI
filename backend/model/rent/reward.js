const mongoose = require('mongoose');
const rewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pointsUsed: { type: Number, required: true },
    rewardType: {
      type: String,
      enum: ["discount", "freeRental", "voucher"],
      required: true,
    },
    details: { type: String },
    redeemedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Reward = mongoose.models.Reward || mongoose.model("Reward", rewardSchema);
module.exports = Reward;
