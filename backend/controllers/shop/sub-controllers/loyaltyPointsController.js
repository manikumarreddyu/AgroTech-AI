const LoyaltyPoint = require("../../../model/shop/sub-model/loyaltyPointModel");
const User = require("../../../model/user");

// Award points to a user
exports.awardPoints = async (req, res) => {
  try {
    const { userId, points, earnedBy } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPoints = new LoyaltyPoint({ userId, points, earnedBy });
    await newPoints.save();

    user.loyaltyPoints += points;
    await user.save();

    res
      .status(200)
      .json({ message: "Points awarded successfully", points: newPoints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a user's loyalty points balance
exports.getPoints = async (req, res) => {
  try {
    const { userId } = req.params;

    const points = await LoyaltyPoint.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$userId", totalPoints: { $sum: "$points" } } },
    ]);

    if (!points.length)
      return res.status(404).json({ message: "No points found for this user" });

    res.status(200).json({ totalPoints: points[0].totalPoints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get transaction history of loyalty points
exports.getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await LoyaltyPoint.find({ userId }).sort({
      timestamp: -1,
    });

    if (!transactions.length)
      return res
        .status(404)
        .json({ message: "No transaction history found for this user" });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a specific loyalty point entry
exports.deletePoints = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const deletedTransaction = await LoyaltyPoint.findByIdAndDelete(
      transactionId
    );
    if (!deletedTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    res
      .status(200)
      .json({
        message: "Loyalty points transaction deleted",
        transaction: deletedTransaction,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a specific loyalty point transaction
exports.updatePoints = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { points, earnedBy } = req.body;

    const updatedTransaction = await LoyaltyPoint.findByIdAndUpdate(
      transactionId,
      { points, earnedBy },
      { new: true }
    );

    if (!updatedTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    res
      .status(200)
      .json({
        message: "Loyalty points transaction updated",
        transaction: updatedTransaction,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Filter transactions by earning type (e.g., 'purchase', 'referral')
exports.filterTransactionsByType = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;

    const transactions = await LoyaltyPoint.find({ userId, earnedBy: type });

    if (!transactions.length)
      return res
        .status(404)
        .json({ message: `No transactions found for ${type}` });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get total points earned by referral actions
exports.getPointsByReferrals = async (req, res) => {
  try {
    const { userId } = req.params;

    const referralPoints = await LoyaltyPoint.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          earnedBy: "referral",
        },
      },
      { $group: { _id: "$userId", totalReferralPoints: { $sum: "$points" } } },
    ]);

    if (!referralPoints.length)
      return res
        .status(404)
        .json({ message: "No referral points found for this user" });

    res
      .status(200)
      .json({ totalReferralPoints: referralPoints[0].totalReferralPoints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get total points earned by purchase actions
exports.getPointsByPurchases = async (req, res) => {
  try {
    const { userId } = req.params;

    const purchasePoints = await LoyaltyPoint.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          earnedBy: "purchase",
        },
      },
      { $group: { _id: "$userId", totalPurchasePoints: { $sum: "$points" } } },
    ]);

    if (!purchasePoints.length)
      return res
        .status(404)
        .json({ message: "No purchase points found for this user" });

    res
      .status(200)
      .json({ totalPurchasePoints: purchasePoints[0].totalPurchasePoints });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Redeem points (reduce points based on redemption)
exports.redeemPoints = async (req, res) => {
  try {
    const { userId, pointsToRedeem } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalPoints = await LoyaltyPoint.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$userId", totalPoints: { $sum: "$points" } } },
    ]);

    if (totalPoints[0].totalPoints < pointsToRedeem) {
      return res
        .status(400)
        .json({ message: "Insufficient points for redemption" });
    }

    const redemption = new LoyaltyPoint({
      userId,
      points: -pointsToRedeem,
      earnedBy: "redemption",
    });
    await redemption.save();

    res
      .status(200)
      .json({ message: "Points redeemed successfully", redemption });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Calculate loyalty point summary (overall breakdown)
exports.getLoyaltySummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const totalPoints = await LoyaltyPoint.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$userId", totalPoints: { $sum: "$points" } } },
    ]);

    const referralPoints = await LoyaltyPoint.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          earnedBy: "referral",
        },
      },
      { $group: { _id: "$userId", totalReferralPoints: { $sum: "$points" } } },
    ]);

    const purchasePoints = await LoyaltyPoint.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          earnedBy: "purchase",
        },
      },
      { $group: { _id: "$userId", totalPurchasePoints: { $sum: "$points" } } },
    ]);

    res.status(200).json({
      totalPoints: totalPoints.length ? totalPoints[0].totalPoints : 0,
      referralPoints: referralPoints.length
        ? referralPoints[0].totalReferralPoints
        : 0,
      purchasePoints: purchasePoints.length
        ? purchasePoints[0].totalPurchasePoints
        : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
