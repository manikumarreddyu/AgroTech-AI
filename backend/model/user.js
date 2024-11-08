// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true,minlength: 3, maxlength: 30  },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ['admin', 'farmer', 'vendor', 'customer'],
    default: 'customer',
  },
  resetPasswordOTP: { type: String },
  resetPasswordExpires: { type: Date },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  otp: { type: String },
  otpExpires: { type: Date },
  googleId: { type: String, sparse: true }, 

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RentProduct',
    }
  ]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
