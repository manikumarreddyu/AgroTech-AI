const Payment = require("../models/payment");

// Retrieve all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const { orderId, userId, amount, paymentMethod, transactionId } = req.body;

  const newPayment = new Payment({
    paymentId: `PAY${Date.now()}`,
    orderId,
    userId,
    amount,
    paymentMethod,
    transactionId,
  });

  try {
    const payment = await newPayment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  const { paymentStatus } = req.body;
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Payment = require("../models/payment");

// Update Payment Method
const updatePaymentMethod = async (req, res) => {
  const { paymentMethod } = req.body;
  try {
    if (!["Credit Card", "PayPal", "Bank Transfer"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentMethod },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve Payments by Date Range
const getPaymentsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const payments = await Payment.find({
      paymentDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    if (!payments.length)
      return res
        .status(404)
        .json({ message: "No payments found in this date range" });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve Payments by Amount Range
const getPaymentsByAmountRange = async (req, res) => {
  const { minAmount, maxAmount } = req.query;
  try {
    const payments = await Payment.find({
      amount: { $gte: minAmount, $lte: maxAmount },
    });
    if (!payments.length)
      return res
        .status(404)
        .json({ message: "No payments found in this amount range" });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve Payment by Transaction ID
const getPaymentByTransactionId = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      transactionId: req.params.transactionId,
    });
    if (!payment)
      return res
        .status(404)
        .json({ message: "Payment not found with this transaction ID" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Count Payments by Status
const countPaymentsByStatus = async (req, res) => {
  try {
    const counts = await Payment.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePaymentStatus,
  updatePaymentMethod,
  getPaymentsByDateRange,
  getPaymentsByAmountRange,
  getPaymentByTransactionId,
  countPaymentsByStatus,
};
