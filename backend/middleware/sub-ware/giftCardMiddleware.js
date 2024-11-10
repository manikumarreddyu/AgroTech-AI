const GiftCard = require("../../model/shop/sub-model/GiftCard");

// Validate if gift card is active and not expired
exports.validateGiftCard = async (req, res, next) => {
  const { cardNumber } = req.body;

  const giftCard = await GiftCard.findOne({ cardNumber });

  if (!giftCard) {
    return res.status(404).json({ message: "Gift card not found" });
  }

  if (giftCard.status === "redeemed") {
    return res.status(400).json({ message: "Gift card already redeemed" });
  }

  if (giftCard.status === "expired") {
    return res.status(400).json({ message: "Gift card has expired" });
  }

  if (giftCard.expiryDate < new Date()) {
    giftCard.status = "expired";
    await giftCard.save();
    return res.status(400).json({ message: "Gift card has expired" });
  }

  next();
};
