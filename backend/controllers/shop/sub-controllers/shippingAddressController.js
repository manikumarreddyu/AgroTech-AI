// controllers/shippingAddressController.js
const ShippingAddress = require('../../../model/shop/sub-model/ShippingAddress');

// Add a new shipping address
exports.addShippingAddress = async (req, res) => {
  try {
    const { addressLine1, addressLine2, city, state, postalCode, country } = req.body;

    const newAddress = new ShippingAddress({
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      user: req.user._id  // assuming user authentication middleware is in place
    });

    await newAddress.save();
    res.status(201).json({ message: 'Shipping address added successfully', address: newAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all shipping addresses for a user
exports.getShippingAddresses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a specific shipping address
exports.updateShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { addressLine1, addressLine2, city, state, postalCode, country } = req.body;

    const updatedAddress = await ShippingAddress.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { addressLine1, addressLine2, city, state, postalCode, country },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found or not authorized' });
    }

    res.status(200).json({ message: 'Shipping address updated successfully', address: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a specific shipping address
exports.deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAddress = await ShippingAddress.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found or not authorized' });
    }

    res.status(200).json({ message: 'Shipping address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
