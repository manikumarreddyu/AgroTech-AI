const validatePaymentData = (req, res, next) => {
  const { orderId, userId, amount, paymentMethod, transactionId } = req.body;

  if (!orderId || !userId || !amount || !paymentMethod || !transactionId) {
    return res
      .status(400)
      .json({ message: "All fields are required for payment" });
  }

  next();
};

const validateInvoiceData = (req, res, next) => {
  const { orderId, userId, amount, dueDate, paymentId } = req.body;

  if (!orderId || !userId || !amount || !dueDate || !paymentId) {
    return res
      .status(400)
      .json({ message: "All fields are required for invoice" });
  }

  next();
};

module.exports = { validatePaymentData, validateInvoiceData };
