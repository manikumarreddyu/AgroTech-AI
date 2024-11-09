const Analytics = require("../../model/rent/Analytics");
const mongoose = require("mongoose");
exports.productPerformace = async (req, res) => {
    try {
      const { productId } = req.params;
      const productPerformance = await Analytics.aggregate([
        { $match: { productId: mongoose.Types.ObjectId(productId) } },
        {
          $group: {
            _id: '$productId',
            totalRentals: { $sum: 1 },
            averageRating: { $avg: '$rating' },
            totalRevenue: { $sum: '$revenue' },
          },
        },
      ]);
      res.status(200).json(productPerformance[0] || {});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.rentalInsights = async (req, res) => {
    try {
      const { userId } = req.params;
      const userInsights = await Analytics.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: '$userId',
            totalRentals: { $sum: 1 },
            totalSpent: { $sum: '$revenue' },
            averageRating: { $avg: '$rating' },
          },
        },
      ]);
      res.status(200).json(userInsights[0] || {});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.rentalStats = async (req, res) => {
    try {
      const rentalTrends = await Analytics.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$rentalDate" },
              month: { $month: "$rentalDate" }
            },
            totalRentals: { $sum: 1 },
            totalRevenue: { $sum: '$revenue' },
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
      res.status(200).json(rentalTrends);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  exports.topCustomers = async (req, res) => {
    try {
      const topCustomers = await Analytics.aggregate([
        {
          $group: {
            _id: '$userId',
            totalRentals: { $sum: 1 },
            totalRevenue: { $sum: '$revenue' },
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 5 },
      ]);
      res.status(200).json(topCustomers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


