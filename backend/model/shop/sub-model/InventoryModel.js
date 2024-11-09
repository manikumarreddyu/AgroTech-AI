const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product collection
    required: true
  },
  currentStockLevel: {
    type: Number,
    required: true,
    min: 0 // Stock can't be negative
  },
  reorderLevel: {
    type: Number,
    required: true,
    min: 0 // Threshold can't be negative
  },
  lastRestockedDate: {
    type: Date,
    default: Date.now
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier', // Optional link to Supplier schema
  },
  warehouseLocation: {
    type: String,
    required: true // Warehouse location field
  },
  reorderNotificationSent: {
    type: Boolean,
    default: false // Indicates if a reorder alert has been triggered
  },
  auditLog: [{
    action: String, // Describes the action (e.g., "Stock Update", "Reorder Triggered")
    actionDate: {
      type: Date,
      default: Date.now
    },
    performedBy: String, // User who performed the action
    quantityChanged: Number, // Amount of stock changed
    notes: String // Additional details about the action
  }],
  lastCheckedDate: {
    type: Date,
    default: Date.now // Timestamp for the last reorder level check
  }
});

// Virtual to get the last audit entry
inventorySchema.virtual('latestAuditEntry').get(function () {
  return this.auditLog.length > 0 ? this.auditLog[this.auditLog.length - 1] : null;
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
