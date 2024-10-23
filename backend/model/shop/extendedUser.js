const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import the existing user schema
const userSchema = require('../user'); // Adjust the path based on your project structure

// Define the address schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});

// Define the wishlist item schema
const wishlistItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

// Define the order item schema
const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  products: { type: [orderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, default: 'pending' },
});

// Define the payment method schema
const paymentMethodSchema = new mongoose.Schema({
  method: { type: String, required: true },
  details: { type: Object, required: true },
});

// Extend the user schema
const extendedUserSchema = new mongoose.Schema({
  ...userSchema.obj, // Spread the existing user schema fields
  role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
  address: { type: [addressSchema], default: [] },
  phone: { type: String, optional: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  cart: { type: [cartItemSchema], default: [] },
  wishlist: { type: [wishlistItemSchema], default: [] },
  orderHistory: { type: [orderSchema], default: [] },
  paymentMethods: { type: [paymentMethodSchema], default: [] },
});

// Hash password before saving
extendedUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create the ExtendedUser model
const ExtendedUser = mongoose.model('ExtendedUser', extendedUserSchema);

module.exports = ExtendedUser;
