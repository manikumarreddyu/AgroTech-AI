const Inventory = require("../../../model/shop/sub-model/InventoryModel");
const Product = require("../../../model/shop/product");
const Supplier = require("../../../model/shop/sub-model/SuppierModel");
const mongoose = require("mongoose");


exports.createInventoryItem = async (req, res) => {
  try {
    const {
      productId,
      currentStockLevel,
      reorderLevel,
      warehouseLocation,
      supplierId,
      performedBy,
    } = req.body;

    // Ensure product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    // Optional: Check if supplier exists (if provided)
    if (supplierId) {
      const supplier = await Supplier.findById(supplierId);
      if (!supplier) {
        return res.status(400).json({ message: "Supplier not found" });
      }
    }

    const newInventoryItem = new Inventory({
      productId,
      currentStockLevel,
      reorderLevel,
      warehouseLocation,
      supplierId,
    });

    // Adding audit log for creation
    newInventoryItem.auditLog.push({
      action: "Inventory Item Created",
      performedBy,
      quantityChanged: currentStockLevel,
      notes: `Initial stock for ${product.name}`,
    });

    await newInventoryItem.save();
    res
      .status(201)
      .json({
        message: "Inventory item created successfully",
        newInventoryItem,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating inventory item", error });
  }
};

// Controller for updating stock level
exports.updateStockLevel = async (req, res) => {
  try {
    const { inventoryId, newStockLevel, performedBy, notes } = req.body;

    if (newStockLevel < 0) {
      return res
        .status(400)
        .json({ message: "Stock level cannot be negative" });
    }

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    const quantityChanged = newStockLevel - inventory.currentStockLevel;
    inventory.currentStockLevel = newStockLevel;
    inventory.auditLog.push({
      action: "Stock Level Updated",
      performedBy,
      quantityChanged,
      notes,
    });

    await inventory.save();
    res
      .status(200)
      .json({ message: "Stock level updated successfully", inventory });
  } catch (error) {
    res.status(500).json({ message: "Error updating stock level", error });
  }
};

// Controller to fetch inventory by product
exports.fetchInventoryByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const inventoryItem = await Inventory.findOne({ productId })
      .populate("productId")
      .populate("supplierId");

    if (!inventoryItem) {
      return res
        .status(404)
        .json({ message: "Inventory not found for this product" });
    }

    res.status(200).json({ inventoryItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching inventory by product", error });
  }
};

// Controller to fetch inventory by warehouse
exports.fetchInventoryByWarehouse = async (req, res) => {
  try {
    const { warehouseLocation } = req.params;
    const inventoryItems = await Inventory.find({ warehouseLocation })
      .populate("productId")
      .populate("supplierId");

    if (!inventoryItems || inventoryItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No inventory found for this warehouse" });
    }

    res.status(200).json({ inventoryItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching inventory by warehouse", error });
  }
};

// Controller to fetch all inventory
exports.fetchAllInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find()
      .populate("productId")
      .populate("supplierId");

    if (!inventoryItems || inventoryItems.length === 0) {
      return res.status(404).json({ message: "No inventory items found" });
    }

    res.status(200).json({ inventoryItems });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all inventory", error });
  }
};

// Controller to delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    await inventory.remove();
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item", error });
  }
};

// Controller for bulk updating stock levels
exports.bulkUpdateStockLevels = async (req, res) => {
  try {
    const { updates, performedBy } = req.body;

    const updatedItems = [];
    for (const update of updates) {
      const { inventoryId, newStockLevel, notes } = update;
      const inventory = await Inventory.findById(inventoryId);

      if (!inventory) {
        return res
          .status(404)
          .json({ message: `Inventory item with ID ${inventoryId} not found` });
      }

      const quantityChanged = newStockLevel - inventory.currentStockLevel;
      inventory.currentStockLevel = newStockLevel;
      inventory.auditLog.push({
        action: "Stock Level Updated (Bulk)",
        performedBy,
        quantityChanged,
        notes,
      });

      await inventory.save();
      updatedItems.push(inventory);
    }

    res
      .status(200)
      .json({
        message: "Bulk stock levels updated successfully",
        updatedItems,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating stock levels in bulk", error });
  }
};

// Controller for bulk creation of inventory items
exports.bulkCreateInventoryItems = async (req, res) => {
  try {
    const { items, performedBy } = req.body;
    const createdItems = [];

    for (const item of items) {
      const {
        productId,
        currentStockLevel,
        reorderLevel,
        warehouseLocation,
        supplierId,
      } = item;

      // Ensure product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Optional: Check if supplier exists (if provided)
      if (supplierId) {
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
          return res
            .status(400)
            .json({ message: `Supplier with ID ${supplierId} not found` });
        }
      }

      const newInventoryItem = new Inventory({
        productId,
        currentStockLevel,
        reorderLevel,
        warehouseLocation,
        supplierId,
      });

      newInventoryItem.auditLog.push({
        action: "Inventory Item Created (Bulk)",
        performedBy,
        quantityChanged: currentStockLevel,
        notes: `Initial stock for ${product.name}`,
      });

      await newInventoryItem.save();
      createdItems.push(newInventoryItem);
    }

    res
      .status(201)
      .json({
        message: "Bulk inventory items created successfully",
        createdItems,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating inventory items in bulk", error });
  }
};

// Controller for logging actions in inventory audit trail
exports.logInventoryAction = async (req, res) => {
  try {
    const { inventoryId, action, performedBy, quantityChanged, notes } =
      req.body;

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    inventory.auditLog.push({
      action,
      performedBy,
      quantityChanged,
      notes,
    });

    await inventory.save();
    res.status(200).json({ message: "Action logged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging action", error });
  }
};

// Controller for handling expired inventory (e.g., perishable items)
exports.handleExpiredInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const expiredInventory = await Inventory.find({
      productId,
      currentStockLevel: { $gt: 0 },
      lastRestockedDate: { $lt: new Date() },
    });

    if (expiredInventory.length === 0) {
      return res
        .status(404)
        .json({ message: "No expired inventory found for this product" });
    }

    for (const inventory of expiredInventory) {
      inventory.currentStockLevel = 0; // Mark stock as zero
      inventory.auditLog.push({
        action: "Expired Inventory Removed",
        performedBy: "System",
        quantityChanged: -inventory.currentStockLevel,
        notes: "Inventory marked as expired",
      });

      await inventory.save();
    }

    res
      .status(200)
      .json({
        message: "Expired inventory handled successfully",
        expiredInventory,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error handling expired inventory", error });
  }
};
