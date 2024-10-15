const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    role: { type: String},
    registrationDate: { type: Date, default: Date.now },
    avatar: { type: Buffer, default: null },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: {type : Number},
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
