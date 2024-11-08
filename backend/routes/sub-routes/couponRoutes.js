const express = require('express');
const router = express.Router();
const couponController = require('../../controllers/shop/sub-controllers/couponController');

// Route to create a new coupon
router.post('/create', couponController.createCoupon);

// Route to fetch all coupons
router.get('/', couponController.getCoupons);

// Route to get a specific coupon by its code
router.get('/:code', couponController.getCouponByCode);

// Route to update a coupon
router.put('/:code', couponController.updateCoupon);

// Route to delete a coupon
router.delete('/:code', couponController.deleteCoupon);

// Route to validate a coupon before applying to an order
router.post('/validate', couponController.validateCoupon, (req, res) => {
  res.status(200).json({ message: 'Coupon is valid', coupon: req.coupon });
});

// Route to track coupon usage
router.post('/usage', couponController.incrementUsageCount);

// Route to activate or deactivate a coupon
router.put('/:code/status', couponController.toggleCouponStatus);

// Route to apply coupon to an order
router.post('/apply', couponController.applyCouponToOrder);

module.exports = router;
