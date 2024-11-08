const OrderHistory = require("../../../model/shop/sub-model/OrderHistory");
const Product = require("../../../model/shop/product"); 
const User = require("../../../model/user"); 


exports.createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentDetails } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Validate product availability and calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product)
        return res
          .status(400)
          .json({ message: `Product with ID ${item.productId} not found` });
      totalAmount += product.price * item.quantity;
    }

    const order = new OrderHistory({
      userId,
      items,
      shippingAddress,
      totalAmount,
      paymentStatus: paymentDetails.status || "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assume authentication middleware sets req.user

    const orders = await OrderHistory.find({ userId })
      .populate("items.productId")
      .select("orderId orderDate orderStatus totalAmount items shippingAddress")
      .exec();

    if (!orders) return res.status(404).json({ message: "No orders found" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, trackingNumber } = req.body;
    const userId = req.user.id; // Assume authentication middleware

    // Fetch the order
    const order = await OrderHistory.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Ensure that the user is allowed to update the order
    if (order.userId.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update order status and tracking number if provided
    order.orderStatus = orderStatus;
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; // Assume authentication middleware

    // Fetch the order
    const order = await OrderHistory.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Ensure that the user is allowed to delete the order
    if (order.userId.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check order status (e.g., only allow deletion if "Pending")
    if (order.orderStatus !== "Pending") {
      return res
        .status(400)
        .json({ message: "Cannot delete non-pending orders" });
    }

    await order.remove();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; // Assume authentication middleware sets req.user

    const order = await OrderHistory.findOne({ _id: orderId, userId })
      .populate("items.productId", "name price")
      .exec();

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.addItemToOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;

    const order = await OrderHistory.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(400).json({ message: "Product not found" });
    if (product.stock < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    // Add item to order
    const item = { productId, quantity, price: product.price };
    order.items.push(item);
    order.totalAmount += product.price * quantity;

    await order.save();
    res.status(200).json({ message: "Item added to order", order });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.removeItemFromOrder = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    const order = await OrderHistory.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const itemIndex = order.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in order" });

    const item = order.items[itemIndex];
    order.totalAmount -= item.price * item.quantity;
    order.items.splice(itemIndex, 1); // Remove item from array

    await order.save();
    res.status(200).json({ message: "Item removed from order", order });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.updateOrderItemQuantity = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { quantity } = req.body;

    const order = await OrderHistory.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.items.find((item) => item._id.toString() === itemId);
    if (!item)
      return res.status(404).json({ message: "Item not found in order" });

    const product = await Product.findById(item.productId);
    if (product.stock < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    // Update totalAmount by adjusting only the quantity difference
    order.totalAmount += (quantity - item.quantity) * item.price;
    item.quantity = quantity;

    await order.save();
    res.status(200).json({ message: "Order item quantity updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.bulkUpdateOrderStatus = async (req, res) => {
  try {
    const { orderIds, orderStatus } = req.body;

    const updatedOrders = await OrderHistory.updateMany(
      { _id: { $in: orderIds } },
      { $set: { orderStatus } }
    );

    res
      .status(200)
      .json({ message: "Order statuses updated successfully", updatedOrders });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getOrderStatusHistory = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderHistory.findById(orderId).select("statusHistory");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order.statusHistory);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const orders = await OrderHistory.find({ orderStatus: status })
      .populate("userId", "name email") // Optionally populate user details
      .exec();

    if (orders.length === 0)
      return res
        .status(404)
        .json({ message: "No orders with the specified status" });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await OrderHistory.find()
      .populate("userId", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await OrderHistory.countDocuments();

    res.status(200).json({
      totalOrders: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
