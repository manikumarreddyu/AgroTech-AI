const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  address: { type: String, maxlength: 100 },
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

  rentals: [
    {
      rentalId: { type: String, required: true }, 
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'RentProduct', required: true }, 
      quantity: { type: Number, default: 1 },
      rentalDuration: { type: String, required: true }, 
      rentalDate: { type: Date, default: Date.now }, 
      returnDate: { type: Date }, 
      status: {
        type: String,
        enum: ['ongoing', 'returned', 'cancelled', 'approved' ,'rejected'],
        default: 'ongoing',
      },
    }
  ],
  
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RentProduct',
    }
  ],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'RentProduct', required: true },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
  
module.exports = User;
