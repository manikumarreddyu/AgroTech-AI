
const Referral = require("../../../model/shop/sub-model/Referral");
const User = require("../../../model/user");
const {
  generateUniqueCode,
  validateReferralCodeFormat,
} = require("../../../services/sub-service/referralUtils");
const { logInfo, logError } = require("../../../services/sub-service/logger");

// Create a referral code and handle errors
exports.createReferral = async (req, res) => {
  try {
    const { referrerId } = req.body;

    const referrer = await User.findById(referrerId);
    if (!referrer) {
      logError("Referrer not found");
      return res.status(404).json({ message: "Referrer user not found" });
    }

    const existingReferral = await Referral.findOne({
      referrerId,
      status: "pending",
    });
    if (existingReferral) {
      logInfo("Active referral code already exists for this user");
      return res
        .status(400)
        .json({ message: "Active referral code already exists" });
    }

    const referralCode = generateUniqueCode();
    const newReferral = new Referral({ referrerId, referralCode });

    await newReferral.save();
    logInfo(
      `Referral created for referrerId: ${referrerId}, code: ${referralCode}`
    );
    res
      .status(201)
      .json({ message: "Referral created successfully", referralCode });
  } catch (error) {
    logError("Error creating referral", error);
    res.status(500).json({ message: "Error creating referral", error });
  }
};

// Get referral status
exports.checkReferralStatus = async (req, res) => {
  try {
    const { code } = req.params;

    if (!validateReferralCodeFormat(code)) {
      logError("Invalid referral code format");
      return res.status(400).json({ message: "Invalid referral code format" });
    }

    const referral = await Referral.findOne({ referralCode: code });
    if (!referral) {
      logInfo("Referral code not found");
      return res.status(404).json({ message: "Referral code not found" });
    }

    res.status(200).json({ status: referral.status });
  } catch (error) {
    logError("Error checking referral status", error);
    res.status(500).json({ message: "Error checking referral status", error });
  }
};

// Complete a referral process
exports.completeReferral = async (req, res) => {
  try {
    const { code, refereeId } = req.body;

    if (!validateReferralCodeFormat(code)) {
      logError("Invalid referral code format");
      return res.status(400).json({ message: "Invalid referral code format" });
    }

    const referral = await Referral.findOne({ referralCode: code });
    if (!referral) {
      logInfo("Referral code not found");
      return res.status(404).json({ message: "Referral code not found" });
    }

    if (referral.status === "completed") {
      logInfo("Referral code already used");
      return res.status(400).json({ message: "Referral code already used" });
    }

    const referee = await User.findById(refereeId);
    if (!referee) {
      logInfo("Referee user not found");
      return res.status(404).json({ message: "Referee user not found" });
    }

    if (referral.referrerId.toString() === refereeId) {
      logInfo("Cannot use your own referral code");
      return res
        .status(400)
        .json({ message: "Cannot use your own referral code" });
    }

    referral.status = "completed";
    referral.refereeId = refereeId;
    await referral.save();
    logInfo(`Referral code ${code} completed successfully by ${refereeId}`);

    res.status(200).json({ message: "Referral completed successfully" });
  } catch (error) {
    logError("Error completing referral", error);
    res.status(500).json({ message: "Error completing referral", error });
  }
};

// Get referrals for specific referrer with extra filters and pagination
exports.getReferralsByReferrer = async (req, res) => {
  try {
    const { referrerId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    const referrer = await User.findById(referrerId);
    if (!referrer) {
      logError("Referrer user not found");
      return res.status(404).json({ message: "Referrer user not found" });
    }

    const filter = { referrerId };
    if (status) filter.status = status;

    const referrals = await Referral.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalCount = await Referral.countDocuments(filter);

    res.status(200).json({
      referrals,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    logError("Error retrieving referrals by referrer", error);
    res.status(500).json({ message: "Error retrieving referrals", error });
  }
};

// List all referrals for admin with advanced filtering and sorting
exports.listAllReferrals = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const referrals = await Referral.find()
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalCount = await Referral.countDocuments();

    res.status(200).json({
      referrals,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    logError("Error retrieving all referrals", error);
    res.status(500).json({ message: "Error retrieving referrals", error });
  }
};

// Cancel a pending referral
exports.cancelReferral = async (req, res) => {
  try {
    const { code } = req.body;

    const referral = await Referral.findOne({ referralCode: code });
    if (!referral) {
      logInfo("Referral code not found");
      return res.status(404).json({ message: "Referral code not found" });
    }

    if (referral.status !== "pending") {
      logInfo("Only pending referrals can be canceled");
      return res
        .status(400)
        .json({ message: "Only pending referrals can be canceled" });
    }

    referral.status = "canceled";
    await referral.save();
    logInfo(`Referral code ${code} canceled successfully`);

    res.status(200).json({ message: "Referral canceled successfully" });
  } catch (error) {
    logError("Error canceling referral", error);
    res.status(500).json({ message: "Error canceling referral", error });
  }
};
