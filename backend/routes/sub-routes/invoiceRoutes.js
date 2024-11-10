const express = require("express");
const router = express.Router();

const {
  generateInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
  markOverdueInvoices,
  invoiceSummary,
  generateBulkInvoices,
} = require("../controllers/invoiceController");

// Route to generate a new invoice after payment confirmation
router.post("/generate", generateInvoice);

// Route to retrieve invoices by user, order, status, or date range with pagination and sorting
router.get("/", getInvoices);

// Route to retrieve a specific invoice by its ID
router.get("/:id", getInvoiceById);

// Route to update an invoice's status
router.patch("/:id/status", updateInvoiceStatus);

// Route to delete an invoice by its ID
router.delete("/:id", deleteInvoice);

// Route to mark overdue invoices (based on the current date)
router.patch("/mark-overdue", markOverdueInvoices);

// Route to get an invoice summary (by status, optionally by user)
router.get("/summary", invoiceSummary);

// Route to generate bulk invoices at once
router.post("/generate-bulk", generateBulkInvoices);

module.exports = router;
