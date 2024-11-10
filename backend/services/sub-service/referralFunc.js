const crypto = require("crypto");

// Generate a unique referral code with a specified length
function generateReferralCode(length = 8) {
  return crypto
    .randomBytes(length)
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}

// Check if the referral code format is valid (alphanumeric and of correct length)
function isReferralCodeValid(code, length = 8) {
  const regex = new RegExp(`^[A-Z0-9]{${length}}$`);
  return regex.test(code);
}

// Calculate the expiration date of a referral, adding days from the creation date
function calculateExpiryDate(days = 30) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  return expiryDate;
}

// Format date to a readable string format
function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

// Utility to log referral creation or status changes
function logReferralAction(referralCode, action, referrerId, refereeId = null) {
  console.log(`[${new Date().toISOString()}] Referral Action: ${action}`);
  console.log(`Referral Code: ${referralCode}`);
  console.log(`Referrer ID: ${referrerId}`);
  if (refereeId) console.log(`Referee ID: ${refereeId}`);
  console.log("------------------------------");
}

// Utility function to check if a referral is expired
function isReferralExpired(referral) {
  const currentDate = new Date();
  return currentDate > referral.expiryDate;
}

// Send notification email to the referrer
async function sendReferralNotificationEmail(email, message) {
  try {
    // Here, you'd use a real email service like SendGrid, Mailgun, etc.
    console.log(`Sending email to ${email} with message: ${message}`);
    // Example: await emailService.send({ to: email, subject: 'Referral Update', text: message });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

// Validate referrer and referee IDs
function validateUserIds(referrerId, refereeId) {
  if (!referrerId || !refereeId) {
    throw new Error("Both referrer and referee IDs must be provided");
  }
  if (referrerId === refereeId) {
    throw new Error("Referrer and referee cannot be the same person");
  }
}

// Helper to calculate loyalty points based on a referral action
function calculateLoyaltyPoints(actionType) {
  switch (actionType) {
    case "purchase":
      return 10;
    case "referral":
      return 20;
    case "review":
      return 5;
    default:
      return 0;
  }
}

// Fetch paginated results from a referral list (for admin or reporting)
function getPaginatedResults(referralList, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return referralList.slice(startIndex, endIndex);
}

// Generate a secure hash for sensitive referral data
function hashReferralData(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Utility function to update referral status
function updateReferralStatus(referral, status) {
  if (!["pending", "completed", "expired", "cancelled"].includes(status)) {
    throw new Error("Invalid status value");
  }
  referral.status = status;
}

// Utility function to validate status input
function isValidStatus(status) {
  return ["pending", "completed", "expired", "cancelled"].includes(status);
}

// Utility to handle common referral errors
function handleReferralError(error) {
  if (error.message.includes("duplicate")) {
    return { message: "Duplicate referral code", status: 400 };
  } else if (error.message.includes("expired")) {
    return { message: "Referral code has expired", status: 400 };
  } else {
    return { message: "An unexpected error occurred", status: 500 };
  }
}

// Export all utility functions
module.exports = {
  generateReferralCode,
  isReferralCodeValid,
  calculateExpiryDate,
  formatDate,
  logReferralAction,
  isReferralExpired,
  sendReferralNotificationEmail,
  validateUserIds,
  calculateLoyaltyPoints,
  getPaginatedResults,
  hashReferralData,
  updateReferralStatus,
  isValidStatus,
  handleReferralError,
};
