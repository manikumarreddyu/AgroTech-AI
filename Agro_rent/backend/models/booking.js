const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' },
    startDate: { type: Date },
    endDate: { type: Date },
    totalDuration: { type: Number },
    totalCost: { type: Number },
    status: { type: String },
    paymentStatus: { type: String },
    bookingTime: { type: Date, default: Date.now },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
