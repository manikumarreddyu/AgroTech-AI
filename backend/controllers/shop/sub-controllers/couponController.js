const Coupon = require("../../../model/shop/sub-model/couponModel");
const { validateCoupon } = require("../../../services/sub-service/couponValidator");

// Controller to Create a Coupon
exports.createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Get All Coupons
exports.getCoupons = async (req, res) => {
  try {
    const { status, minOrderAmount, startDate, endDate } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (minOrderAmount) filters.minOrderAmount = { $gte: minOrderAmount };
    if (startDate || endDate) {
      filters.startDate = { $gte: startDate || new Date() };
      filters.endDate = { $lte: endDate || new Date() };
    }

    const coupons = await Coupon.find(filters);
    res.status(200).json(coupons);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Get Coupon by Code
exports.getCouponByCode = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Update Coupon
exports.updateCoupon = async (req, res) => {
  try {
    const updatedCoupon = await Coupon.findOneAndUpdate(
      { code: req.params.code },
      { $set: req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Delete Coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findOneAndDelete({
      code: req.params.code,
    });
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Validate Coupon
exports.validateCoupon = async (req, res, next) => {
  const { code, orderAmount } = req.body;
  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ error: "Coupon not found" });

    // Validate coupon using helper function
    const isValid = await validateCoupon(coupon, orderAmount);
    if (!isValid) return res.status(400).json({ error: "Coupon is invalid" });

    req.coupon = coupon; // Attach coupon to the request object for use in further steps
    next();
  } catch (err) {
    res.status(500).json({ error: "Error validating coupon" });
  }
};

// Controller to Track Coupon Usage (Increment Usage Count)
exports.incrementUsageCount = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ error: "Coupon not found" });

    // Increment the usage count by 1
    coupon.usageCount += 1;

    // Check if the usage limit has been reached
    if (coupon.usageCount > coupon.usageLimit) {
      return res.status(400).json({ error: "Coupon usage limit exceeded" });
    }

    await coupon.save();
    res.status(200).json({ message: "Coupon usage count incremented", coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Activate/Deactivate Coupon
exports.toggleCouponStatus = async (req, res) => {
  try {
    const { code } = req.params;
    const { status } = req.body; // 'active' or 'inactive'

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const coupon = await Coupon.findOneAndUpdate(
      { code },
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon status updated", coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller to Apply Coupon to an Order
exports.applyCouponToOrder = async (req, res) => {
  const { code, orderAmount } = req.body;
  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ error: "Coupon not found" });

    const isValid = await validateCoupon(coupon, orderAmount);
    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Coupon is invalid for this order" });
    }

    const discount =
      coupon.discountType === "percentage"
        ? (coupon.discountValue / 100) * orderAmount
        : coupon.discountValue;

    // Apply max discount if it exists
    const finalDiscount = coupon.maxDiscount
      ? Math.min(discount, coupon.maxDiscount)
      : discount;

    res
      .status(200)
      .json({
        message: "Coupon applied successfully",
        discount: finalDiscount,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
