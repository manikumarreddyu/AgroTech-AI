const mongoose = require('mongoose');

const agriProductSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productName: String,
    productType: {
        type: String,
        enum: ['Equipment', 'Land', 'Seeds', 'Fertilizers', 'Other'],
    },
    description: String,
    price: Number, 
    priceType: {
        type: String,
        enum: ['Rent', 'Lease', 'Sell', 'Buy'],
    },
    availability: {
        startDate: String, 
        endDate: String, 
    },
    location: {
        address: String,
        city: String,
        state: String,
        zipcode: String,
    },
    contactDetails: {
        phone: String,
        email: String,
    },
    condition: String,
    imageUrl: String,
    postedDate: {
        type: Date,
        default: Date.now,
    },
    isAvailable: {
        type: Boolean,
        default: true, 
    },
});

const AgriProduct = mongoose.model('AgriProduct', agriProductSchema);

module.exports = AgriProduct;