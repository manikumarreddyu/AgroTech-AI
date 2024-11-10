const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    productsSupplied: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
    status: {
      type: String,
      required: true,
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
