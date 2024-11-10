// Middleware to apply loyalty discount
const applyLoyaltyDiscount = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const loyaltyDiscount = {
        bronze: 0,
        silver: 5,
        gold: 10,
        platinum: 15,
      };
      const discount = loyaltyDiscount[user.loyaltyTier];
      req.body.rentalCost = req.body.rentalCost * ((100 - discount) / 100);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  