const Variant = require('../model/shop/Variant');

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
    const variant = await Variant.findById(req.params.id).populate('product');
    if (!variant) return res.status(404).json({ error: "Variant not found" });
    res.json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new variant
exports.createVariant = async (req, res) => {
  const { product, size, color, additionalPrice } = req.body;
  try {
    const variant = new Variant({ product, size, color, additionalPrice });
    await variant.save();
    res.status(201).json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update variant
exports.updateVariant = async (req, res) => {
  try {
    const updatedVariant = await Variant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVariant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete variant
exports.deleteVariant = async (req, res) => {
  try {
    await Variant.findByIdAndDelete(req.params.id);
    res.json({ message: "Variant deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
