const { validateCoupon } = require('../../middleware/sub-ware/validateCoupon');

module.exports = async (req, res, next) => {
  const { code, orderAmount } = req.body;
  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    const isValid = await validateCoupon(coupon, orderAmount);
    if (!isValid) {
      return res.status(400).json({ error: 'Coupon is invalid' });
    }

    req.coupon = coupon;  // Attach coupon to the request object for use in further steps
    next();
  } catch (err) {
    res.status(500).json({ error: 'Error validating coupon' });
  }
};
