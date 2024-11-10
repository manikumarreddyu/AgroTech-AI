const mongoose = require('mongoose');

const userAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityLog: {
    type: [String],
    default: [],
  },
  interactions: {
    type: Number,
    default: 0,
  },
  preferences: {
    type: Object,
    default: {},
  },
});

const UserAnalysis = mongoose.model('UserAnalysis', userAnalysisSchema);

module.exports = UserAnalysis;
