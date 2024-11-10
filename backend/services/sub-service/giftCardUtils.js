// Check if a gift card has expired based on its expiry date
exports.isExpired = (expiryDate) => {
  const currentDate = new Date();
  return new Date(expiryDate) < currentDate;
};

// Format a gift card's value into a currency string (e.g., $100.00)
exports.formatGiftCardValue = (value) => {
  return `$${value.toFixed(2)}`;
};

// Validate if the gift card value is positive
exports.isValidGiftCardValue = (value) => {
  return value > 0;
};

// Helper function to generate a random expiration date (within 1 year)
exports.generateRandomExpiryDate = () => {
  const currentDate = new Date();
  const randomMonths = Math.floor(Math.random() * 12) + 1; // Expiry in 1 to 12 months
  currentDate.setMonth(currentDate.getMonth() + randomMonths);
  return currentDate;
};

// Helper function to validate card number format (GC-XXXXXXX)
exports.isValidCardNumber = (cardNumber) => {
  const regex = /^GC-[A-Z0-9]{9}$/;
  return regex.test(cardNumber);
};

// Generate a random status for the card (active, redeemed, expired)
exports.generateRandomStatus = () => {
  const statuses = ["active", "redeemed", "expired"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to generate random user ID (for user association)
exports.generateUserId = () => {
  return `USR-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
};

// Check if the gift card can be redeemed (it must be active and not expired)
exports.canRedeem = (giftCard) => {
  if (giftCard.status !== "active") {
    return false;
  }

  return !this.isExpired(giftCard.expiryDate);
};

// Utility to get the current date in ISO string format
exports.getCurrentDate = () => {
  return new Date().toISOString();
};
