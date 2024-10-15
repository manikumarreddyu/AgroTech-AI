const mongoose = require('mongoose');

// Define the schema for Notification
const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    content: { type: String },
    timestamp: { type: Date },
    status: { type: String }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;