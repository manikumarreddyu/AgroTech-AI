// controllers/shippingAddressController.js
const ShippingAddress = require("../../../model/shop/sub-model/ShippingAddress");

// Add a new shipping address
exports.addShippingAddress = async (req, res) => {
  try {
    const { addressLine1, addressLine2, city, state, postalCode, country } =
      req.body;

    const newAddress = new ShippingAddress({
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      user: req.user._id, // assuming user authentication middleware is in place
    });

    await newAddress.save();
    res
      .status(201)
      .json({
        message: "Shipping address added successfully",
        address: newAddress,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all shipping addresses for a user
exports.getShippingAddresses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a specific shipping address
exports.updateShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { addressLine1, addressLine2, city, state, postalCode, country } =
      req.body;

    const updatedAddress = await ShippingAddress.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { addressLine1, addressLine2, city, state, postalCode, country },
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }

    res
      .status(200)
      .json({
        message: "Shipping address updated successfully",
        address: updatedAddress,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a specific shipping address
exports.deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAddress = await ShippingAddress.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }

    res.status(200).json({ message: "Shipping address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Set a primary shipping address
exports.setPrimaryAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user's addresses and set all addresses to not primary
    await ShippingAddress.updateMany(
      { user: req.user._id },
      { $set: { isPrimary: false } }
    );

    // Set the specified address as primary
    const primaryAddress = await ShippingAddress.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { isPrimary: true } },
      { new: true }
    );

    if (!primaryAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }

    res
      .status(200)
      .json({
        message: "Primary address set successfully",
        address: primaryAddress,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a specific shipping address by ID
exports.getShippingAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await ShippingAddress.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!address) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized" });
    }

    res.status(200).json({ address });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get primary shipping address
exports.getPrimaryAddress = async (req, res) => {
  try {
    const primaryAddress = await ShippingAddress.findOne({
      user: req.user._id,
      isPrimary: true,
    });

    if (!primaryAddress) {
      return res.status(404).json({ message: "No primary address found" });
    }

    res.status(200).json({ address: primaryAddress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Set a default address
exports.setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Reset all addresses' default status for the user
    await ShippingAddress.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    // Set the specified address as default
    const defaultAddress = await ShippingAddress.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { isDefault: true } },
      { new: true }
    );

    if (!defaultAddress) {
      return res.status(404).json({ message: 'Address not found or not authorized' });
    }

    res.status(200).json({ message: 'Default address set successfully', address: defaultAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search addresses by field (e.g., city, state, country)
exports.searchAddresses = async (req, res) => {
  try {
    const { city, state, country } = req.query;
    const searchCriteria = { user: req.user._id };

    if (city) searchCriteria.city = city;
    if (state) searchCriteria.state = state;
    if (country) searchCriteria.country = country;

    const addresses = await ShippingAddress.find(searchCriteria);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Archive a specific address
exports.archiveAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const archivedAddress = await ShippingAddress.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { isArchived: true } },
      { new: true }
    );

    if (!archivedAddress) {
      return res.status(404).json({ message: 'Address not found or not authorized' });
    }

    res.status(200).json({ message: 'Address archived successfully', address: archivedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Retrieve only active (non-archived) addresses
exports.getActiveAddresses = async (req, res) => {
  try {
    const activeAddresses = await ShippingAddress.find({
      user: req.user._id,
      isArchived: { $ne: true },
    });

    res.status(200).json(activeAddresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
