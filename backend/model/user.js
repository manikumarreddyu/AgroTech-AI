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
  },
  { timestamps: true } // Timestamps automatically add createdAt and updatedAt
);

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
