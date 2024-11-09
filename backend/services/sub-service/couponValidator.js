const validateCoupon = async (coupon, orderAmount) => {
    const currentDate = new Date();
  
    // Check if coupon is expired
    if (currentDate < coupon.startDate || currentDate > coupon.endDate) {
      return false;
    }
  
    // Check if minimum order amount is met
    if (orderAmount < coupon.minOrderAmount) {
      return false;
    }
  
    // Check if coupon usage limit has been exceeded
    if (coupon.usageCount >= coupon.usageLimit) {
      return false;
    }
  
    return true;
  };
  
  module.exports = { validateCoupon };
  