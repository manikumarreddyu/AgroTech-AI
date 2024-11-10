const Warehouse = require("../models/Warehouse");

// Middleware to check if warehouse exists by ID
const checkWarehouseExists = async (req, res, next) => {
  const { warehouseId } = req.params;
  const warehouse = await Warehouse.findOne({ warehouseId });
  if (!warehouse) {
    return res.status(404).json({ message: "Warehouse not found" });
  }
  req.warehouse = warehouse;
  next();
};

// Middleware to validate warehouse fields during updates
const validateWarehouseFields = (req, res, next) => {
  const { capacity, currentOccupancy, address } = req.body;

  // Validate capacity
  if (capacity <= 0) {
    return res
      .status(400)
      .json({ message: "Capacity must be a positive number" });
  }

  // Validate that currentOccupancy does not exceed capacity
  if (currentOccupancy > capacity) {
    return res
      .status(400)
      .json({ message: "Current Occupancy cannot exceed Warehouse Capacity" });
  }

  // Validate address fields
  if (
    !address ||
    !address.street ||
    !address.city ||
    !address.state ||
    !address.zip ||
    !address.country
  ) {
    return res.status(400).json({ message: "Address fields must be complete" });
  }

  next();
};

// Middleware to validate unique warehouse ID or name
const validateUniqueWarehouse = async (req, res, next) => {
  const { warehouseId, warehouseName } = req.body;

  const existingWarehouse = await Warehouse.findOne({
    $or: [{ warehouseId }, { warehouseName }],
  });
  if (existingWarehouse) {
    return res
      .status(400)
      .json({ message: "Warehouse ID or Name must be unique" });
  }

  next();
};

module.exports = {
  checkWarehouseExists,
  validateWarehouseFields,
  validateUniqueWarehouse,
};
