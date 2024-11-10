const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Regex for email validation
    },
    address: { type: String, maxlength: 100 },
    password: { type: String, required: true }, // Password field is required
    role: {
      type: String,
      enum: ["admin", "farmer", "vendor", "customer"],
      default: "customer", // Default role is customer
    },
    resetPasswordOTP: { type: String },
    resetPasswordExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    phone: { type: String },
    profilePicture: { type: String },
    googleId: { type: String, sparse: true }, // Sparse index allows for non-unique Google IDs
    rentals: [
      {
        rentalId: { type: String, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "RentProduct", required: true },
        quantity: { type: Number, default: 1 },
        rentalDuration: { type: String, required: true },
        rentalDate: { type: Date, default: Date.now },
        returnDate: { type: Date },
        status: {
          type: String,
          enum: ["ongoing", "returned", "cancelled", "approved", "rejected"],
          default: "ongoing",
        },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RentProduct",
      },
    ],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "RentProduct", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    points: { type: Number, default: 0 }, // Points for rewards
    referralCode: { type: String, unique: true }, // Referral code unique to each user
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referral tracking
    loyaltyTier: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze",
    },
  },
  { timestamps: true } // Timestamps automatically add createdAt and updatedAt
);


// Generate a referral code on user creation
userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.referralCode = generateReferralCode(this._id);
  }
  next();
});

// Utility function to generate a referral code
function generateReferralCode(userId) {
  return `REF${userId.toString().slice(-4).toUpperCase()}`;
}


userSchema.methods.addPoints = async function (rentalCost) {
  const pointsEarned = Math.floor(rentalCost / 10); // 10% of rental cost as points
  this.points += pointsEarned;

  // Update loyalty tier based on accumulated points
  if (this.points >= 1000) this.loyaltyTier = "platinum";
  else if (this.points >= 500) this.loyaltyTier = "gold";
  else if (this.points >= 200) this.loyaltyTier = "silver";

  await this.save();
};

userSchema.methods.redeemPoints = async function (points, rewardType) {
  if (this.points < points) throw new Error("Insufficient points");
  this.points -= points;

  const reward = await Reward.create({
    userId: this._id,
    pointsUsed: points,
    rewardType,
  });

  await this.save();
  return reward;
};


// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to hash the password
userSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  return bcrypt.hash(password, salt); // Return the hashed password
};

// Method to compare passwords (used for login)
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare input password with hashed password
};

// Export the User model (will use an existing model if it exists)
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
