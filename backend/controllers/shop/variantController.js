const mongoose = require('mongoose');
const Variant = require('../../model/shop/variant');
const Product = require('../../model/shop/product');

// Get all variants
exports.getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.find().populate('product');
    res.json(variants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get variant by ID
exports.getVariantById = async (req, res) => {
  try {
    const variantId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(variantId)) {
      return res.status(400).json({ error: 'Invalid variant ID' });
    }

    const variant = await Variant.findById(variantId).populate('product');
    if (!variant) return res.status(404).json({ error: "Variant not found" });
    res.json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new variant
exports.createVariant = async (req, res) => {
  const { product, size, type, color, stock, price } = req.body;

  try {
    // Step 1: Check if product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Step 2: Create and save the variant
    const variant = new Variant({ product, size, type, color, stock, price });
    const savedVariant = await variant.save();

    // Step 3: Add the variant to the product's variants array
    existingProduct.variants.push(savedVariant._id);
    await existingProduct.save();

    res.status(201).json(savedVariant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update variant
exports.updateVariant = async (req, res) => {
  const variantId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(variantId)) {
    return res.status(400).json({ error: 'Invalid variant ID' });
  }

  try {
    const updatedVariant = await Variant.findByIdAndUpdate(variantId, req.body, { new: true });
    if (!updatedVariant) return res.status(404).json({ error: 'Variant not found' });

    res.json(updatedVariant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete variant
exports.deleteVariant = async (req, res) => {
  const variantId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(variantId)) {
    return res.status(400).json({ error: 'Invalid variant ID' });
  }

  try {
    // Step 1: Find the variant and delete it
    const variant = await Variant.findByIdAndDelete(variantId);
    if (!variant) return res.status(404).json({ error: 'Variant not found' });

    // Step 2: Remove the variant from the product's variants array
    await Product.findByIdAndUpdate(
      variant.product,
      { $pull: { variants: variant._id } },
      { new: true }
    );

    res.json({ message: 'Variant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
