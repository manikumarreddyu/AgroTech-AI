const Product = require('../../model/shop/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category brand seller reviews variants');
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category brand seller reviews variants');
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  const { name, description, offer, images, category, brand, seller } = req.body;
  
  try {
    // Ensure images array has at most 3 images
    if (!images || images.length === 0 || images.length > 3) {
      return res.status(400).json({ error: "You must provide 1 to 3 images." });
    }

    const product = new Product({ name, description, offer, images, category, brand, seller });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    // Ensure images array has at most 3 images if provided
    if (req.body.images && (req.body.images.length === 0 || req.body.images.length > 3)) {
      return res.status(400).json({ error: "You must provide 1 to 3 images." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ category: categoryId })
      .populate('category', 'name')
      .populate('brand', 'name')
      .populate('seller', 'name')
      .populate('variants'); // Include variants data

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category.' });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get products by brand
exports.getProductsByBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    const products = await Product.find({ brand: brandId })
      .populate('category', 'name')
      .populate('brand', 'name')
      .populate('seller', 'name')
      .populate('variants'); // Include variants data

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this brand.' });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
