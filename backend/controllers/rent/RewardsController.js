const User = require('../../model/user');
const Reward = require('../../model/rent/reward'); 

exports.accumulatePoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assume user is authenticated
    if (!user) {
      const errorMessage = "User not found.";
      console.error(`Error in accumulatePoints: ${errorMessage} User ID: ${req.user.id}`);
      return res.status(404).json({ error: errorMessage });
    }

    const rentalCost = req.body.rentalCost; // Assume rental cost is sent in request
    if (isNaN(rentalCost) || rentalCost <= 0) {
      const errorMessage = "Invalid rental cost.";
      console.error(`Error in accumulatePoints: ${errorMessage} Rental cost: ${rentalCost}`);
      return res.status(400).json({ error: errorMessage });
    }

    await user.addPoints(rentalCost);
    res.status(200).json({ message: "Points added successfully" });
  } catch (error) {
    console.error(`Error in accumulatePoints: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while accumulating points. Please try again." });
  }
};

exports.redeem = async (req, res) => {
  try {
    const { points, rewardType } = req.body;
    if (!points || points <= 0) {
      const errorMessage = "Invalid points value.";
      console.error(`Error in redeem: ${errorMessage} Points: ${points}`);
      return res.status(400).json({ error: errorMessage });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      const errorMessage = "User not found.";
      console.error(`Error in redeem: ${errorMessage} User ID: ${req.user.id}`);
      return res.status(404).json({ error: errorMessage });
    }

    const reward = await user.redeemPoints(points, rewardType);
    res.status(200).json({ message: "Reward redeemed successfully", reward });
  } catch (error) {
    console.error(`Error in redeem: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while redeeming points. Please try again." });
  }
};

exports.referral = async (req, res) => {
  try {
    const { referralCode } = req.body;
    if (!referralCode) {
      const errorMessage = "Referral code is required.";
      console.error(`Error in referral: ${errorMessage} Referral Code: ${referralCode}`);
      return res.status(400).json({ error: errorMessage });
    }

    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      const errorMessage = "Referral code not found.";
      console.error(`Error in referral: ${errorMessage} Referral Code: ${referralCode}`);
      return res.status(404).json({ error: errorMessage });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      const errorMessage = "User not found.";
      console.error(`Error in referral: ${errorMessage} User ID: ${req.user.id}`);
      return res.status(404).json({ error: errorMessage });
    }

    user.referredBy = referrer._id;
    referrer.points += 50; // Give referrer points
    await referrer.save();
    await user.save();

    res.status(200).json({ message: "Referral recorded successfully" });
  } catch (error) {
    console.error(`Error in referral: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while processing the referral. Please try again." });
  }
};

exports.pointRewards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("rewards");
    if (!user) {
      const errorMessage = "User not found.";
      console.error(`Error in pointRewards: ${errorMessage} User ID: ${req.user.id}`);
      return res.status(404).json({ error: errorMessage });
    }

    res.status(200).json({ points: user.points, rewards: user.rewards });
  } catch (error) {
    console.error(`Error in pointRewards: ${error.message}`, error);
    res.status(500).json({ error: "An error occurred while retrieving points and rewards. Please try again." });
  }
};
