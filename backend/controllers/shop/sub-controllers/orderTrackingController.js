const OrderTracking = require("../../../model/shop/sub-model/OrderTracking");

// Create new order tracking information
exports.createOrderTracking = async (req, res) => {
  try {
    const orderTracking = new OrderTracking(req.body);
    await orderTracking.save();
    res.status(201).json(orderTracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Retrieve tracking information for a specific order
exports.getOrderTracking = async (req, res) => {
  try {
    const orderTracking = await OrderTracking.findOne({
      orderId: req.params.orderId,
    });
    if (!orderTracking) {
      return res.status(404).json({ message: "Order tracking not found" });
    }
    res.status(200).json(orderTracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update tracking information for an order
exports.updateOrderTracking = async (req, res) => {
  try {
    const orderTracking = await OrderTracking.findOneAndUpdate(
      { orderId: req.params.orderId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!orderTracking) {
      return res.status(404).json({ message: "Order tracking not found" });
    }
    res.status(200).json(orderTracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete tracking information for an order
exports.deleteOrderTracking = async (req, res) => {
  try {
    const orderTracking = await OrderTracking.findOneAndDelete({
      orderId: req.params.orderId,
    });
    if (!orderTracking) {
      return res.status(404).json({ message: "Order tracking not found" });
    }
    res.status(200).json({ message: "Order tracking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve all order tracking information
exports.getAllOrderTrackings = async (req, res) => {
  try {
    const orderTrackings = await OrderTracking.find({});
    res.status(200).json(orderTrackings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve order tracking information filtered by status
exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await OrderTracking.find({ status });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve recently updated orders (within the last 24 hours)
exports.getRecentUpdates = async (req, res) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const recentOrders = await OrderTracking.find({
      updatedAt: { $gte: yesterday },
    });

    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve orders by specific carrier
exports.getOrdersByCarrier = async (req, res) => {
  try {
    const { carrier } = req.params;
    const orders = await OrderTracking.find({ carrier });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve orders with estimated delivery within a date range
exports.getOrdersByEstimatedDeliveryRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const orders = await OrderTracking.find({
      estimatedDelivery: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOverdueOrders = async (req, res) => {
  try {
    const today = new Date();
    const overdueOrders = await OrderTracking.find({
      estimatedDelivery: { $lt: today },
      status: { $ne: "Delivered" },
    });
    res.status(200).json(overdueOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Bulk update the status of multiple orders
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { orderIds, status } = req.body;
    const result = await OrderTracking.updateMany(
      { orderId: { $in: orderIds } },
      { status, updatedAt: Date.now() }
    );
    res
      .status(200)
      .json({ message: `${result.nModified} orders updated successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve orders updated within a specific date range
exports.getOrdersUpdatedWithinRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const orders = await OrderTracking.find({
      updatedAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve orders by a range of tracking numbers
exports.getOrdersByTrackingNumberRange = async (req, res) => {
  try {
    const { startTrackingNumber, endTrackingNumber } = req.query;
    const orders = await OrderTracking.find({
      trackingNumber: { $gte: startTrackingNumber, $lte: endTrackingNumber },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve orders with selected fields
exports.getOrdersWithSelectedFields = async (req, res) => {
  try {
    const fields = req.query.fields.split(",").join(" ");
    const orders = await OrderTracking.find({}, fields);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
