const Invoice = require("../models/invoice");
const Joi = require("joi");

// Validation Schemas
const invoiceSchema = Joi.object({
  orderId: Joi.string().required(),
  userId: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  dueDate: Joi.date().required(),
  paymentId: Joi.string().optional(),
});

const statusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("Paid", "Unpaid", "Overdue", "Cancelled")
    .required(),
});

// Generate invoice after payment confirmation
const generateInvoice = async (req, res) => {
  const { error, value } = invoiceSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { orderId, userId, amount, dueDate, paymentId } = value;

  const newInvoice = new Invoice({
    invoiceId: `INV${Date.now()}`,
    orderId,
    userId,
    amount,
    dueDate,
    paymentId,
  });

  try {
    const invoice = await newInvoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error(`Error generating invoice: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve invoices by user, order, status, or date range with pagination
const getInvoices = async (req, res) => {
  const {
    userId,
    orderId,
    status,
    startDate,
    endDate,
    page = 1,
    limit = 10,
    sortBy = "invoiceDate",
    order = "desc",
  } = req.query;

  try {
    const filters = {};
    if (userId) filters.userId = userId;
    if (orderId) filters.orderId = orderId;
    if (status) filters.status = status;

    if (startDate || endDate) {
      filters.invoiceDate = {};
      if (startDate) filters.invoiceDate.$gte = new Date(startDate);
      if (endDate) filters.invoiceDate.$lte = new Date(endDate);
    }

    const invoices = await Invoice.find(filters)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(invoices);
  } catch (error) {
    console.error(`Error fetching invoices: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve a single invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (error) {
    console.error(`Error fetching invoice by ID: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update invoice status with validation
const updateInvoiceStatus = async (req, res) => {
  const { error, value } = statusUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status: value.status },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (error) {
    console.error(`Error updating invoice status: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an invoice by ID
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error(`Error deleting invoice: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mark overdue invoices
const markOverdueInvoices = async (req, res) => {
  try {
    const overdueInvoices = await Invoice.updateMany(
      { dueDate: { $lt: new Date() }, status: "Unpaid" },
      { status: "Overdue" }
    );
    res
      .status(200)
      .json({
        message: `${overdueInvoices.nModified} invoices marked as overdue`,
      });
  } catch (error) {
    console.error(`Error marking overdue invoices: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Summary of invoices by status
const invoiceSummary = async (req, res) => {
  const { userId } = req.query;

  try {
    const match = userId ? { userId } : {};

    const summary = await Invoice.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$status",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const summaryData = summary.reduce((acc, item) => {
      acc[item._id] = { totalAmount: item.totalAmount, count: item.count };
      return acc;
    }, {});

    res.status(200).json(summaryData);
  } catch (error) {
    console.error(`Error generating invoice summary: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Bulk invoice generation
const generateBulkInvoices = async (req, res) => {
  const { invoices } = req.body;

  if (!Array.isArray(invoices) || invoices.length === 0) {
    return res.status(400).json({ message: "Invalid invoices data" });
  }

  const validationErrors = invoices
    .map((invoiceData, index) => {
      const { error } = invoiceSchema.validate(invoiceData);
      return error ? { index, message: error.message } : null;
    })
    .filter(Boolean);

  if (validationErrors.length > 0) {
    return res
      .status(400)
      .json({ message: "Validation errors", errors: validationErrors });
  }

  try {
    const invoiceDocuments = invoices.map((invoiceData) => ({
      ...invoiceData,
      invoiceId: `INV${Date.now() + Math.floor(Math.random() * 1000)}`,
    }));

    const createdInvoices = await Invoice.insertMany(invoiceDocuments);
    res.status(201).json(createdInvoices);
  } catch (error) {
    console.error(`Error generating bulk invoices: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  generateInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
  markOverdueInvoices,
  invoiceSummary,
  generateBulkInvoices,
};
