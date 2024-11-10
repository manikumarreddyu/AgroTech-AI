const Payment = require("../models/payment");
const Invoice = require("../models/invoice");

// Admin view all payments
const adminViewPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("orderId")
      .populate("userId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin view all invoices
const adminViewInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("orderId")
      .populate("userId");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin filter/sort payments
const adminFilterPayments = async (req, res) => {
  const { status, startDate, endDate } = req.query;
  const filters = {};
  if (status) filters.paymentStatus = status;
  if (startDate && endDate)
    filters.paymentDate = { $gte: startDate, $lte: endDate };

  try {
    const payments = await Payment.find(filters);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { adminViewPayments, adminViewInvoices, adminFilterPayments };
