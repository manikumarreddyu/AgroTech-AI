const MalfunctioningProduct = require("../models/MalfunctioningProduct");
const mongoose = require("mongoose");

// Create malfunctioning product
exports.createMalfunctioningProduct = async (req, res) => {
  try {
    const { productId, description, actionsTaken, createdBy } = req.body;

    // Validate if productId exists and is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if the user exists
    const userExists = await User.findById(createdBy);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProduct = new MalfunctioningProduct({
      productId,
      description,
      actionsTaken,
      createdBy,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        message: "Error creating malfunctioning product",
        error: error.message,
      });
  }
};

// Get malfunctioning product by ID
exports.getMalfunctioningProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate if productId exists and is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await MalfunctioningProduct.findById(productId).populate(
      "productId"
    );

    // Handle case where product is not found
    if (!product) {
      return res
        .status(404)
        .json({ message: "Malfunctioning product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error retrieving malfunctioning product",
        error: error.message,
      });
  }
};

// Update malfunctioning product
exports.updateMalfunctioningProduct = async (req, res) => {
  try {
    const updatedData = req.body;
    const productId = req.params.id;

    // Validate if productId exists and is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Check if any field is being updated and validate
    if (
      !updatedData.productId &&
      !updatedData.description &&
      !updatedData.actionsTaken
    ) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const product = await MalfunctioningProduct.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    // Handle case where product is not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error updating malfunctioning product",
        error: error.message,
      });
  }
};

// Delete malfunctioning product
exports.deleteMalfunctioningProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate if productId exists and is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await MalfunctioningProduct.findByIdAndDelete(productId);

    // Handle case where product is not found
    if (!product) {
      return res
        .status(404)
        .json({ message: "Malfunctioning product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error deleting malfunctioning product",
        error: error.message,
      });
  }
};

// Get all malfunctioning products with pagination and search
exports.getAllMalfunctioningProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const query = search
      ? { description: { $regex: search, $options: "i" } }
      : {};

    const products = await MalfunctioningProduct.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("productId")
      .exec();

    const totalCount = await MalfunctioningProduct.countDocuments(query);

    res.status(200).json({
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error fetching malfunctioning products",
        error: error.message,
      });
  }
};

// Get count of malfunctioning products by status
exports.getMalfunctioningProductCountByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    if (!["pending", "in progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const count = await MalfunctioningProduct.countDocuments({ status });
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error fetching count by status",
        error: error.message,
      });
  }
};
