const Supplier = require("../models/Supplier");

exports.createSupplier = async (req, res) => {
  try {
    const { name, contactInfo, address, productsSupplied, status } = req.body;
    const supplier = new Supplier({
      name,
      contactInfo,
      address,
      productsSupplied,
      status,
    });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Error creating supplier", error: err });
  }
};

// Get all Suppliers with pagination and sorting
exports.getAllSuppliers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt" } = req.query;
    const suppliers = await Supplier.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching suppliers", error: err });
  }
};

// Get a Supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Error fetching supplier", error: err });
  }
};

// Update a Supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { name, contactInfo, address, productsSupplied, status } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        name,
        contactInfo,
        address,
        productsSupplied,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Error updating supplier", error: err });
  }
};

// Soft delete a Supplier (set status to inactive)
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    );
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Error deleting supplier", error: err });
  }
};

const Supplier = require("../models/Supplier");
const Product = require("../models/Product"); // Assuming there's a Product model

// Add a product to a supplier
exports.addProductToSupplier = async (req, res) => {
  try {
    const { productId } = req.body;
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.productsSupplied.push(productId);
    await supplier.save();

    res.status(200).json(supplier);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding product to supplier", error: err });
  }
};

// Remove a product from a supplier
exports.removeProductFromSupplier = async (req, res) => {
  try {
    const { productId } = req.body;
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.productsSupplied = supplier.productsSupplied.filter(
      (product) => product.toString() !== productId
    );
    await supplier.save();

    res.status(200).json(supplier);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing product from supplier", error: err });
  }
};

// Get all products supplied by a supplier
exports.getProductsSupplied = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      "productsSupplied"
    );
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier.productsSupplied);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};

exports.searchSuppliers = async (req, res) => {
  try {
    const { name, status, email, phone } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (status) query.status = status;
    if (email) query["contactInfo.email"] = email;
    if (phone) query["contactInfo.phone"] = phone;

    const suppliers = await Supplier.find(query);
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: "Error searching suppliers", error: err });
  }
};

exports.getSuppliersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const suppliers = await Supplier.find({ status });
    res.json(suppliers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching suppliers by status", error: err });
  }
};
