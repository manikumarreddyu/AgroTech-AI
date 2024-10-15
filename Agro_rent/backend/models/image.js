
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' },
    filename: String, 
    contentType: String, 
    data: Buffer
});

module.exports = mongoose.model('Image', imageSchema);
