const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' },
    rating: { type: Number },
    comment: { type: String }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
