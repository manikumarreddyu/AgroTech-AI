const mongoose = require("mongoose");


const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: { type: String, required: true, unique: true },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Adds index for faster query on user invoices
    },
    amount: { type: Number, required: true, min: 0 },
    invoiceDate: { type: Date, default: Date.now },
    dueDate: {
      type: Date,
      required: true,
      default: function () {
        return new Date(+new Date() + 7 * 24 * 60 * 60 * 1000); // Default due date is 7 days from invoice date
      },
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid", "Overdue", "Cancelled"],
      default: "Unpaid",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      sparse: true, // Allows null value indexing for unpaid invoices
    },
  },
  { timestamps: true }
);

// Virtual field to check if invoice is overdue
invoiceSchema.virtual("isOverdue").get(function () {
  return this.status === "Unpaid" && this.dueDate < new Date();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
