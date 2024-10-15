const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    availability: { type: String },
    rentalPrice: { type: Number },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    img: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
