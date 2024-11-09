const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  warehouseId: {
     type: String,
      unique: true,
       required: true
     },
  warehouseName: {
     type: String,
      unique: true,
       required: true },
  address: {
    street: { 
        type: String,
         required: true
         },
    city: {
         type: String
         , required: true 
        },
    state: {
         type: String, 
         required: true
         },
    zip: {
         type: String, 
         required: true
         },
    country: { 
        type: String, 
        required: true 
    },
  },
  capacity: {
     type: Number,
      required: true
     },
  currentOccupancy: {
     type: Number,
      default: 0 
    },
  inventoryItems: [
    { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem" 
},
  ],
  contactInfo: {
    phone: { 
        type: String 
    },
    email: { 
        type: String
     },
  },
  lastUpdated: {
     type: Date,
      default: Date.now
     },
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
