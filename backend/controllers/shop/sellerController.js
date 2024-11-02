const Seller = require('../../model/shop/seller');

// Get all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    res.json(seller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new seller
exports.createSeller = async (req, res) => {
  const { name, email, phone, address} = req.body;
  console.log(req.body)
  try {
    const seller = new Seller({ name, email, phone, address });
    await seller.save();
    res.status(201).json(seller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update seller
exports.updateSeller = async (req, res) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSeller);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete seller
exports.deleteSeller = async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ message: "Seller deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
