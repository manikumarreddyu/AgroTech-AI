
const RentProduct = require('../../model/rent/rentProduct');
const SeasonalPricing = require('../../model/rent/seasonalPricing');

// Apply seasonal pricing adjustment for a product
exports.applySeasonalPricing = async (req, res) => {
  try {
    const { productId, season, discountPercentage, startDate, endDate } = req.body;

    // Check if the product exists
    const product = await RentProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newSeasonalPricing = new SeasonalPricing({
      product: productId,
      season,
      discountPercentage,
      startDate,
      endDate
    });

    await newSeasonalPricing.save();
    
    // Apply the seasonal price change immediately
    product.rentalPricePerDay = product.rentalPricePerDay * (1 - discountPercentage / 100);
    await product.save();

    res.status(201).json({ message: 'Seasonal pricing applied successfully', seasonalPricing: newSeasonalPricing });
  } catch (error) {
    console.error('Error applying seasonal pricing:', error.message);
    res.status(500).json({ error: 'Failed to apply seasonal pricing' });
  }
};
