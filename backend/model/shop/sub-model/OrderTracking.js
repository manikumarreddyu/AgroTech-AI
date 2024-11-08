const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderTrackingSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "OrderHistory",
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    required: true,
  },
  carrier: {
    type: String,
    required: true,
  },
  estimatedDelivery: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema Methods

// Update the status of the order and update the updatedAt timestamp
OrderTrackingSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.updatedAt = Date.now();
  return this.save();
};

// Check if the order is overdue based on the estimated delivery date
OrderTrackingSchema.methods.isOverdue = function() {
  if (this.estimatedDelivery && this.status !== "Delivered") {
    const today = new Date();
    return today > this.estimatedDelivery;
  }
  return false;
};

// Format estimated delivery date in a user-friendly format (e.g., MM/DD/YYYY)
OrderTrackingSchema.methods.formatEstimatedDelivery = function() {
  if (!this.estimatedDelivery) return "N/A";
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return this.estimatedDelivery.toLocaleDateString(undefined, options);
};

// Schema Statics

// Find orders by status
OrderTrackingSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Find all overdue orders
OrderTrackingSchema.statics.findOverdueOrders = function() {
  const today = new Date();
  return this.find({
    estimatedDelivery: { $lt: today },
    status: { $ne: "Delivered" },
  });
};

// Bulk update status for multiple orders by order IDs
OrderTrackingSchema.statics.bulkUpdateStatus = function(orderIds, newStatus) {
  return this.updateMany(
    { orderId: { $in: orderIds } },
    { status: newStatus, updatedAt: Date.now() }
  );
};

// Export the model
module.exports = mongoose.model("OrderTracking", OrderTrackingSchema);
