// models/DeliveryPerson.js
const mongoose = require("mongoose");

const deliveryPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  assigned_routes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
  vehicle_details: {
    vehicle_type: { type: String },
    vehicle_number: { type: String },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  password: { 
    type: String 
},
  profile_picture: { 
    type: String
 },
});

module.exports = mongoose.model("DeliveryPerson", deliveryPersonSchema);
