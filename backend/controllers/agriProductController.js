const AgriProduct = require('../model/AgriProduct');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await AgriProduct.find().populate('owner', 'firstName lastName email');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new AgriProduct({ ...req.body, owner: req.user._id });  // Assuming req.user is the logged-in user
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await AgriProduct.findById(req.params.id).populate('owner', 'firstName lastName email');
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await AgriProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await AgriProduct.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
