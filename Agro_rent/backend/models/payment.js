const mongoose = require('mongoose');

// Define the schema for Payment
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    amount: { type: Number },
    paymentDate: { type: Date },
    paymentMethod: { type: String },
    transactionId: { type: String },
    status: { type: String }
});


const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
