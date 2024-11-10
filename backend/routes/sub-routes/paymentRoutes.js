const express = require("express");
const router = express.Router();
const {
  getAllPayments,
  getPaymentById,
  getPaymentsByUserId,
  getPaymentsByStatus,
  createPayment,
  updatePaymentStatus,
  deletePayment,
  updatePaymentMethod,
  getPaymentsByDateRange,
  getPaymentsByAmountRange,
  getPaymentByTransactionId,
  countPaymentsByStatus,
} = require("../controllers/paymentController");

// Payment routes
router.get("/", getAllPayments); // Retrieve all payments
router.get("/:id", getPaymentById); // Retrieve payment by ID
router.get("/user/:userId", getPaymentsByUserId); // Retrieve payments by User ID
router.get("/status/:status", getPaymentsByStatus); // Retrieve payments by Status
router.post("/", createPayment); // Create a new payment
router.patch("/:id/status", updatePaymentStatus); // Update payment status
router.patch("/:id/method", updatePaymentMethod); // Update payment method
router.delete("/:id", deletePayment); // Delete payment

// Additional routes for edge cases
router.get("/date-range", getPaymentsByDateRange); // Retrieve payments by date range
router.get("/amount-range", getPaymentsByAmountRange); // Retrieve payments by amount range
router.get("/transaction/:transactionId", getPaymentByTransactionId); // Retrieve payment by transaction ID
router.get("/count/status", countPaymentsByStatus); // Count payments by status

module.exports = router;
