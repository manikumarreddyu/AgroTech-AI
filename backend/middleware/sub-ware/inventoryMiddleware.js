const Inventory = require("../../model/shop/sub-model/InventoryModel");
const Product = require("../../model/shop/product");

// Middleware to validate if product exists before creating inventory
exports.validateProductExistence = async (req, res, next) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  next();
};

// Middleware to ensure valid stock level when updating
exports.validateStockLevel = (req, res, next) => {
  const { newStockLevel } = req.body;

  if (newStockLevel < 0) {
    return res.status(400).json({ message: "Stock level cannot be negative" });
  }

  next();
};

// Middleware to ensure reorder level is logical (not negative)
exports.validateReorderLevel = (req, res, next) => {
  const { reorderLevel } = req.body;

  if (reorderLevel < 0) {
    return res
      .status(400)
      .json({ message: "Reorder level cannot be negative" });
  }

  next();
};
