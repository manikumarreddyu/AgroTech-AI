const Promotion = require("../../model/rent/promotion");


// Create a new promotion
exports.createPromotion = async (req, res) => {
  try {
    const { code, description, discountPercentage, startDate, endDate, applicableProducts, status } = req.body;
    
    // Create the promotion object
    const newPromotion = new Promotion({
      code,
      description,
      discountPercentage,
      startDate,
      endDate,
      applicableProducts,
      status
    });

    // Save the promotion to the database
    await newPromotion.save();
    res.status(201).json({ message: 'Promotion created successfully', promotion: newPromotion });
  } catch (error) {
    console.error('Error creating promotion:', error.message);
    res.status(500).json({ error: 'Failed to create promotion' });
  }
};

// Get all active promotions
exports.getActivePromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find({ status: 'active' });

    res.status(200).json({ promotions });
  } catch (error) {
    console.error('Error fetching promotions:', error.message);
    res.status(500).json({ error: 'Failed to fetch active promotions' });
  }
};

// Deactivate a promotion
exports.deactivatePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const promotion = await Promotion.findById(promotionId);

    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    promotion.status = 'inactive';
    await promotion.save();
    
    res.status(200).json({ message: 'Promotion deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating promotion:', error.message);
    res.status(500).json({ error: 'Failed to deactivate promotion' });
  }
};
