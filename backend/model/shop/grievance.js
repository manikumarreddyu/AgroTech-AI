const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  email: {
    type: String,
    required: true,
    // This field will be populated automatically when the grievance is created
  },
  orderNumber: {
    type: String,
    required: false, // Optional field
  },
  category: {
    type: String,
    required: true,
    enum: ["product-quality", "delivery", "customer-service", "website", "other"], // Define allowed categories
  },
  description: {
    type: String,
    required: true,
  },
  reportId: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved'],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to automatically populate email from the User model
GrievanceSchema.pre('save', async function(next) {
  if (this.isNew && this.userId) {
    try {
      const user = await mongoose.model('User').findById(this.userId);
      if (user) {
        this.email = user.email; // Populate email field from the User schema
      }
      next();
    } catch (error) {
      next(error); // Error handling if user is not found
    }
  } else {
    next();
  }
});


module.exports = mongoose.model('Grievance', GrievanceSchema);
