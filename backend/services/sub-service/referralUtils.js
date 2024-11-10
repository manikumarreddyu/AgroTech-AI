
exports.generateUniqueCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

exports.validateReferralCodeFormat = (code) => {
  return /^[A-Z0-9]{8}$/.test(code);
};
