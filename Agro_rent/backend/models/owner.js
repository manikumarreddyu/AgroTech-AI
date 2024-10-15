const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    machines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    accStatus: { type: String }
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
