const Product = require('../model/shop/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category brand seller reviews variants');
    res.json(products);
  } catch (err) {
    console.log(err)
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
  const { name, description, price, stock, offer,imageUrl, category, brand, seller } = req.body;
  try {
    const product = new Product({ name, description, price, stock,offer, imageUrl, category, brand, seller });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  
  try {
    const products = await Product.find({ category: categoryId })
      .populate('category','name')
      .populate('brand', 'name') // Populate brand name
      .populate('seller', 'name'); // Populate seller name

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category.' });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};