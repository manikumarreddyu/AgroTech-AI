// controllers/giftCardController.js
const GiftCard = require("../../../model/shop/sub-model/GiftCard");

// Create a new gift card
exports.createGiftCard = async (req, res) => {
  try {
    const { value, userId, expiryDate } = req.body;

    if (value <= 0) {
      return res
        .status(400)
        .json({ message: "Gift card value must be greater than 0" });
    }

    const cardNumber = generateCardNumber();

    const newGiftCard = new GiftCard({
      cardNumber,
      value,
      userId,
      expiryDate,
    });

    await newGiftCard.save();
    res
      .status(201)
      .json({
        message: "Gift card created successfully",
        giftCard: newGiftCard,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating gift card", error: err.message });
  }
};

// Redeem a gift card
exports.redeemGiftCard = async (req, res) => {
  try {
    const { cardNumber } = req.body;

    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    if (giftCard.status === "redeemed") {
      return res.status(400).json({ message: "Gift card already redeemed" });
    }

    if (giftCard.status === "expired") {
      return res.status(400).json({ message: "Gift card is expired" });
    }

    if (giftCard.expiryDate < new Date()) {
      giftCard.status = "expired";
      await giftCard.save();
      return res.status(400).json({ message: "Gift card has expired" });
    }

    if (giftCard.value <= 0) {
      return res.status(400).json({ message: "Gift card value is invalid" });
    }

    giftCard.status = "redeemed";
    await giftCard.save();

    res
      .status(200)
      .json({ message: "Gift card redeemed successfully", giftCard });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error redeeming gift card", error: err.message });
  }
};

// Fetch gift card details
exports.getGiftCardDetails = async (req, res) => {
  try {
    const { cardNumber } = req.params;
    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    res.status(200).json({ giftCard });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error fetching gift card details",
        error: err.message,
      });
  }
};

// Fetch all active gift cards for a user
exports.getUserGiftCards = async (req, res) => {
  try {
    const { userId } = req.params;

    const giftCards = await GiftCard.find({ userId, status: "active" });

    if (giftCards.length === 0) {
      return res
        .status(404)
        .json({ message: "No active gift cards found for this user" });
    }

    res.status(200).json({ giftCards });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user gift cards", error: err.message });
  }
};

// Extend gift card expiration
exports.extendGiftCardExpiry = async (req, res) => {
  try {
    const { cardNumber, newExpiryDate } = req.body;

    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    if (giftCard.status === "redeemed") {
      return res
        .status(400)
        .json({ message: "Cannot extend expiry of redeemed card" });
    }

    if (giftCard.status === "expired") {
      return res
        .status(400)
        .json({ message: "Cannot extend expiry of expired card" });
    }

    giftCard.expiryDate = new Date(newExpiryDate);
    await giftCard.save();

    res
      .status(200)
      .json({ message: "Gift card expiry extended successfully", giftCard });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error extending gift card expiry",
        error: err.message,
      });
  }
};

// Deactivate a gift card
exports.deactivateGiftCard = async (req, res) => {
  try {
    const { cardNumber } = req.body;

    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    if (giftCard.status === "redeemed") {
      return res
        .status(400)
        .json({ message: "Cannot deactivate redeemed card" });
    }

    giftCard.status = "expired";
    await giftCard.save();

    res
      .status(200)
      .json({ message: "Gift card deactivated successfully", giftCard });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deactivating gift card", error: err.message });
  }
};

// Delete a gift card (force delete)
exports.deleteGiftCard = async (req, res) => {
  try {
    const { cardNumber } = req.body;

    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    await giftCard.remove();
    res.status(200).json({ message: "Gift card deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting gift card", error: err.message });
  }
};

// Reactivate an expired gift card
exports.reactivateGiftCard = async (req, res) => {
  try {
    const { cardNumber } = req.body;

    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    if (giftCard.status === "redeemed") {
      return res
        .status(400)
        .json({ message: "Cannot reactivate redeemed card" });
    }

    if (giftCard.status === "active") {
      return res.status(400).json({ message: "Gift card is already active" });
    }

    giftCard.status = "active";
    giftCard.expiryDate = new Date(); // Reset the expiry date to a new default
    await giftCard.save();

    res
      .status(200)
      .json({ message: "Gift card reactivated successfully", giftCard });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error reactivating gift card", error: err.message });
  }
};

// Update the value of a gift card
exports.updateGiftCardValue = async (req, res) => {
  try {
    const { cardNumber, newValue } = req.body;

    if (newValue <= 0) {
      return res
        .status(400)
        .json({ message: "New value must be greater than 0" });
    }

    const giftCard = await GiftCard.findOne({ cardNumber });

    if (!giftCard) {
      return res.status(404).json({ message: "Gift card not found" });
    }

    giftCard.value = newValue;
    await giftCard.save();

    res
      .status(200)
      .json({ message: "Gift card value updated successfully", giftCard });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating gift card value", error: err.message });
  }
};

// Search for gift cards by value range
exports.searchGiftCardsByValue = async (req, res) => {
  try {
    const { minValue, maxValue } = req.query;

    if (minValue <= 0 || maxValue <= 0) {
      return res
        .status(400)
        .json({ message: "Value range must be greater than 0" });
    }

    const giftCards = await GiftCard.find({
      value: { $gte: minValue, $lte: maxValue },
    });

    if (giftCards.length === 0) {
      return res
        .status(404)
        .json({ message: "No gift cards found within this value range" });
    }

    res.status(200).json({ giftCards });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error searching gift cards by value",
        error: err.message,
      });
  }
};

// Helper function to generate a unique card number
const generateCardNumber = () => {
  return `GC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};
