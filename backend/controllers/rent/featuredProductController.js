
const FeaturedProduct = require('../../model/rent/featuredProduct');
const RentProduct = require('../../model/rent/rentProduct');

// Feature a product
exports.featureProduct = async (req, res) => {
  try {
    const { productId, description, startDate, endDate } = req.body;

    // Check if the product exists
    const product = await RentProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newFeaturedProduct = new FeaturedProduct({
      product: productId,
      description,
      startDate,
      endDate,
      status: 'active'
    });

    await newFeaturedProduct.save();
    res.status(201).json({ message: 'Product featured successfully', featuredProduct: newFeaturedProduct });
  } catch (error) {
    console.error('Error featuring product:', error.message);
    res.status(500).json({ error: 'Failed to feature product' });
  }
};

// Get all featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await FeaturedProduct.find({ status: 'active' }).populate('product');

    res.status(200).json({ featuredProducts });
  } catch (error) {
    console.error('Error fetching featured products:', error.message);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
};
