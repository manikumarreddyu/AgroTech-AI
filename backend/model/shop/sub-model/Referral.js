
const mongoose = require("mongoose");
const { Schema } = mongoose;

const referralSchema = new Schema({
  referrerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refereeId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Referral", referralSchema);
