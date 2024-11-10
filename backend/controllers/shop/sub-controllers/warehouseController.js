const Warehouse = require("../../../model/shop/sub-model/Warehouse");
const InventoryItem = require("../../../model/shop/sub-model/InventoryModel");

// 1. Create Warehouse Logic
exports.createWarehouse = async (req, res) => {
  try {
    const {
      warehouseId,
      warehouseName,
      address,
      capacity,
      currentOccupancy,
      inventoryItems,
      contactInfo,
    } = req.body;

    // Validate unique Warehouse Name and Warehouse ID
    const existingWarehouse = await Warehouse.findOne({
      $or: [{ warehouseId }, { warehouseName }],
    });
    if (existingWarehouse) {
      return res
        .status(400)
        .json({ message: "Warehouse ID or Name must be unique" });
    }

    // Create new warehouse
    const warehouse = new Warehouse({
      warehouseId,
      warehouseName,
      address,
      capacity,
      currentOccupancy,
      inventoryItems,
      contactInfo,
      lastUpdated: new Date(),
    });

    await warehouse.save();

    return res
      .status(201)
      .json({ message: "Warehouse created successfully", warehouse });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 2. Update Warehouse Logic
exports.updateWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const {
      warehouseName,
      address,
      capacity,
      currentOccupancy,
      inventoryItems,
      contactInfo,
    } = req.body;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    // Update warehouse data
    warehouse.warehouseName = warehouseName || warehouse.warehouseName;
    warehouse.address = address || warehouse.address;
    warehouse.capacity = capacity || warehouse.capacity;
    warehouse.currentOccupancy = currentOccupancy || warehouse.currentOccupancy;
    warehouse.inventoryItems = inventoryItems || warehouse.inventoryItems;
    warehouse.contactInfo = contactInfo || warehouse.contactInfo;
    warehouse.lastUpdated = new Date();

    await warehouse.save();

    return res
      .status(200)
      .json({ message: "Warehouse updated successfully", warehouse });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 3. Get Warehouse Inventory
exports.getWarehouseInventory = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    return res.status(200).json({ inventoryItems: warehouse.inventoryItems });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 4. Check Warehouse Capacity
exports.checkWarehouseCapacity = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    if (warehouse.currentOccupancy > warehouse.capacity) {
      return res.status(400).json({
        message: "Current Occupancy exceeds Warehouse Capacity",
        status: "Over Capacity",
        currentOccupancy: warehouse.currentOccupancy,
        capacity: warehouse.capacity,
      });
    }

    return res.status(200).json({
      message: "Warehouse is within capacity",
      status: "Within Capacity",
      currentOccupancy: warehouse.currentOccupancy,
      capacity: warehouse.capacity,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 5. Delete Warehouse Logic
exports.deleteWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    await warehouse.remove();

    return res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 6. Get All Warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    return res.status(200).json(warehouses);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 7. Search Warehouse by Name or ID
exports.searchWarehouse = async (req, res) => {
  try {
    const { query } = req.params;
    const warehouses = await Warehouse.find({
      $or: [
        { warehouseId: { $regex: query, $options: "i" } },
        { warehouseName: { $regex: query, $options: "i" } },
      ],
    });

    if (warehouses.length === 0) {
      return res.status(404).json({ message: "No matching warehouses found" });
    }

    return res.status(200).json(warehouses);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 8. Add New Inventory Item
exports.addInventoryItem = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const { itemName, quantity, price } = req.body;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    // Create new inventory item
    const inventoryItem = new InventoryItem({
      itemName,
      quantity,
      price,
      warehouseId,
    });

    await inventoryItem.save();

    // Add the inventory item to the warehouse
    warehouse.inventoryItems.push(inventoryItem);
    await warehouse.save();

    return res
      .status(201)
      .json({ message: "Inventory item added successfully", inventoryItem });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 9. Update Inventory Item
exports.updateInventoryItem = async (req, res) => {
  try {
    const { warehouseId, itemId } = req.params;
    const { quantity, price } = req.body;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const inventoryItem = await InventoryItem.findOne({
      _id: itemId,
      warehouseId,
    });
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    inventoryItem.quantity = quantity || inventoryItem.quantity;
    inventoryItem.price = price || inventoryItem.price;

    await inventoryItem.save();

    return res
      .status(200)
      .json({ message: "Inventory item updated successfully", inventoryItem });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 10. Get Inventory Item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const { warehouseId, itemId } = req.params;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const inventoryItem = await InventoryItem.findOne({
      _id: itemId,
      warehouseId,
    });
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    return res.status(200).json({ inventoryItem });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 11. Delete Inventory Item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const { warehouseId, itemId } = req.params;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const inventoryItem = await InventoryItem.findOne({
      _id: itemId,
      warehouseId,
    });
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Remove item from the warehouse
    warehouse.inventoryItems = warehouse.inventoryItems.filter(
      (item) => item._id.toString() !== itemId
    );
    await warehouse.save();

    // Delete the inventory item
    await inventoryItem.remove();

    return res
      .status(200)
      .json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// 12. Check Stock Level of Item
exports.checkStockLevel = async (req, res) => {
  try {
    const { warehouseId, itemId } = req.params;

    const warehouse = await Warehouse.findOne({ warehouseId });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    const inventoryItem = await InventoryItem.findOne({
      _id: itemId,
      warehouseId,
    });
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    return res.status(200).json({
      message: "Inventory item stock level",
      stockLevel: inventoryItem.quantity,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
