const mongoose = require('mongoose');

const malfunctioningProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in progress', 'resolved'], default: 'pending' },
  reportedDate: { type: Date, default: Date.now },
  resolvedDate: { type: Date },
  actionsTaken: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('MalfunctioningProduct', malfunctioningProductSchema);



const damagedProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  damageType: { type: String, enum: ['crack', 'scratches', 'water damage', 'other'], required: true },
  damageDescription: { type: String, required: true },
  damageSeverity: { type: String, enum: ['minor', 'moderate', 'severe'], required: true },
  reportedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['reported', 'under review', 'resolved'], default: 'reported' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('DamagedProduct', damagedProductSchema);
