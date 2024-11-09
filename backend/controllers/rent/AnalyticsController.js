const Analytics = require("../../model/rent/Analytics");
const mongoose = require("mongoose");

// 1. Product Performance Analytics
exports.productPerformance = async (req, res) => {
    try {
        const { productId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid productId format" });
        }

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

        if (!productPerformance.length) {
            return res.status(404).json({ error: "No analytics found for the specified product" });
        }

        res.status(200).json(productPerformance[0]);
    } catch (error) {
        console.error("Error fetching product performance:", error.message);
        res.status(500).json({ error: "Server error while fetching product performance" });
    }
};

// 2. User Rental Insights
exports.rentalInsights = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

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

        if (!userInsights.length) {
            return res.status(404).json({ error: "No analytics found for the specified user" });
        }

        res.status(200).json(userInsights[0]);
    } catch (error) {
        console.error("Error fetching rental insights:", error.message);
        res.status(500).json({ error: "Server error while fetching rental insights" });
    }
};

// 3. Rental Trends (Rental Stats)
exports.rentalStats = async (req, res) => {
    try {
        const rentalTrends = await Analytics.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$rentalDate" },
                        month: { $month: "$rentalDate" },
                    },
                    totalRentals: { $sum: 1 },
                    totalRevenue: { $sum: '$revenue' },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        if (!rentalTrends.length) {
            return res.status(404).json({ error: "No rental trends data available" });
        }

        res.status(200).json(rentalTrends);
    } catch (error) {
        console.error("Error fetching rental stats:", error.message);
        res.status(500).json({ error: "Server error while fetching rental stats" });
    }
};

// 4. Top Customers
exports.topCustomers = async (req, res) => {
    try {
        const topCustomers = await Analytics.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalRentals: { $sum: 1 },
                    totalRevenue: { $sum: '$revenue' },
                },
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 },
        ]);

        if (!topCustomers.length) {
            return res.status(404).json({ error: "No customer data found" });
        }

        res.status(200).json(topCustomers);
    } catch (error) {
        console.error("Error fetching top customers:", error.message);
        res.status(500).json({ error: "Server error while fetching top customers" });
    }
};
