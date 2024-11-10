const DeliveryPerson = require("../../../model/shop/sub-model/DeliveryPerson");
const { hashPassword } = require("../../../services/sub-service/hashPassword");
const {
  validateEmail,
  validatePhoneNumber,
} = require("../../../services/sub-service/couponValidator");

exports.successResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

exports.errorResponse = (res, statusCode, message, error = {}) => {
  res.status(statusCode).json({
    status: "error",
    message,
    error,
  });
};

// Create a new Delivery Person
exports.createDeliveryPerson = async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      status,
      assigned_routes,
      vehicle_details,
      profile_picture,
      password,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone_number || !status) {
      return errorResponse(res, 400, "All required fields must be provided.");
    }

    // Validate email and phone number formats
    if (!validateEmail(email))
      return errorResponse(res, 400, "Invalid email format.");
    if (!validatePhoneNumber(phone_number))
      return errorResponse(res, 400, "Invalid phone number format.");

    // Check if email already exists
    const existingEmail = await DeliveryPerson.findOne({ email });
    if (existingEmail) return errorResponse(res, 400, "Email already exists.");

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const newDeliveryPerson = new DeliveryPerson({
      name,
      email,
      phone_number,
      status,
      assigned_routes,
      vehicle_details,
      profile_picture,
      password: hashedPassword,
    });

    await newDeliveryPerson.save();
    successResponse(
      res,
      201,
      "Delivery person created successfully.",
      newDeliveryPerson
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all Delivery Persons with pagination
exports.getAllDeliveryPersons = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const deliveryPersons = await DeliveryPerson.find()
      .select("name status vehicle_details.vehicle_type")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    const count = await DeliveryPerson.countDocuments();

    successResponse(res, 200, "Delivery persons retrieved successfully.", {
      deliveryPersons,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get a Delivery Person by ID
exports.getDeliveryPersonById = async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.findById(
      req.params.id
    ).populate("assigned_routes");
    if (!deliveryPerson)
      return errorResponse(res, 404, "Delivery person not found.");
    successResponse(
      res,
      200,
      "Delivery person retrieved successfully.",
      deliveryPerson
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Update a Delivery Person
exports.updateDeliveryPerson = async (req, res) => {
  try {
    const updates = req.body;

    // Validate and hash password if provided
    if (updates.password)
      updates.password = await hashPassword(updates.password);

    // Validate email and phone number if updated
    if (updates.email && !validateEmail(updates.email))
      return errorResponse(res, 400, "Invalid email format.");
    if (updates.phone_number && !validatePhoneNumber(updates.phone_number))
      return errorResponse(res, 400, "Invalid phone number format.");

    // Check if email already exists (excluding current delivery person)
    if (updates.email) {
      const existingEmail = await DeliveryPerson.findOne({
        email: updates.email,
        _id: { $ne: req.params.id },
      });
      if (existingEmail)
        return errorResponse(res, 400, "Email already exists.");
    }

    const updatedDeliveryPerson = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedDeliveryPerson)
      return errorResponse(res, 404, "Delivery person not found.");
    successResponse(
      res,
      200,
      "Delivery person updated successfully.",
      updatedDeliveryPerson
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Soft delete (deactivate) a Delivery Person
exports.deleteDeliveryPerson = async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.findById(req.params.id);
    if (!deliveryPerson)
      return errorResponse(res, 404, "Delivery person not found.");

    deliveryPerson.status = "inactive";
    await deliveryPerson.save();
    successResponse(res, 200, "Delivery person deactivated successfully.");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Activate or Deactivate Delivery Person
exports.toggleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status))
      return errorResponse(res, 400, "Invalid status.");

    const deliveryPerson = await DeliveryPerson.findById(req.params.id);
    if (!deliveryPerson)
      return errorResponse(res, 404, "Delivery person not found.");

    deliveryPerson.status = status;
    await deliveryPerson.save();
    successResponse(res, 200, "Delivery person status updated successfully.", {
      status: deliveryPerson.status,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Helper functions for response handling
const validateVehicleDetails = (vehicleDetails) => {
  const { vehicle_type, vehicle_number } = vehicleDetails;
  if (vehicle_type && typeof vehicle_type !== "string") return false;
  if (vehicle_number && typeof vehicle_number !== "string") return false;
  return true;
};

// Search Delivery Person by name
exports.searchDeliveryPersonByName = async (req, res) => {
  try {
    const { name } = req.query;
    const deliveryPersons = await DeliveryPerson.find({
      name: { $regex: name, $options: "i" },
    });
    successResponse(
      res,
      200,
      "Search results retrieved successfully.",
      deliveryPersons
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Get all assigned routes for a Delivery Person
exports.getAssignedRoutes = async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.findById(
      req.params.id
    ).populate("assigned_routes");
    if (!deliveryPerson)
      return errorResponse(res, 404, "Delivery person not found.");
    successResponse(
      res,
      200,
      "Assigned routes retrieved successfully.",
      deliveryPerson.assigned_routes
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// Change Delivery Person's vehicle details
exports.updateVehicleDetails = async (req, res) => {
  try {
    const { vehicle_details } = req.body;

    // Validate vehicle details format
    if (vehicle_details && !validateVehicleDetails(vehicle_details)) {
      return errorResponse(res, 400, "Invalid vehicle details format.");
    }

    const updatedDeliveryPerson = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      { vehicle_details },
      { new: true }
    );

    if (!updatedDeliveryPerson)
      return errorResponse(res, 404, "Delivery person not found.");
    successResponse(
      res,
      200,
      "Vehicle details updated successfully.",
      updatedDeliveryPerson.vehicle_details
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
