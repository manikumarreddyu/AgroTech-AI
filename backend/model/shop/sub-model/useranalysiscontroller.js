const UserAnalysis = require("../models/UserAnalysis");
const mongoose = require("mongoose");

// Utility function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create User Analysis
exports.createUserAnalysis = async (req, res) => {
  try {
    const { userId, activityLog, interactions, preferences } = req.body;

    // Input validation
    if (
      !userId ||
      !activityLog ||
      !Array.isArray(activityLog) ||
      !interactions ||
      !preferences
    ) {
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: userId, activityLog, interactions, preferences",
        });
    }

    // Check if the userId is valid
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Create new UserAnalysis record
    const userAnalysis = new UserAnalysis({
      userId,
      activityLog,
      interactions,
      preferences,
    });
    await userAnalysis.save();
    res.status(201).json(userAnalysis);
  } catch (error) {
    console.error(error); // For debugging purposes
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Duplicate entry detected for user analysis" });
    }
    res
      .status(500)
      .json({ message: "Error creating user analysis data", error });
  }
};

// Get User Analysis by ID
exports.getUserAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: "Invalid UserAnalysis ID format" });
    }

    const userAnalysis = await UserAnalysis.findById(id);

    if (!userAnalysis) {
      return res.status(404).json({ message: "User analysis not found" });
    }

    res.status(200).json(userAnalysis);
  } catch (error) {
    console.error(error); // For debugging purposes
    res
      .status(500)
      .json({ message: "Error retrieving user analysis data", error });
  }
};

// Update User Analysis by ID
exports.updateUserAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if the id is a valid ObjectId
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: "Invalid UserAnalysis ID format" });
    }

    // Input validation: Ensure there is at least one field to update
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    // Check for fields that shouldn't be updated or are invalid
    if (updatedData.userId && !isValidObjectId(updatedData.userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const userAnalysis = await UserAnalysis.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!userAnalysis) {
      return res.status(404).json({ message: "User analysis not found" });
    }

    res.status(200).json(userAnalysis);
  } catch (error) {
    console.error(error); // For debugging purposes
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Duplicate entry detected during update" });
    }
    res
      .status(500)
      .json({ message: "Error updating user analysis data", error });
  }
};

// Delete User Analysis by ID (Optional - In case we want to support deleting analysis data)
exports.deleteUserAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id is a valid ObjectId
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: "Invalid UserAnalysis ID format" });
    }

    const userAnalysis = await UserAnalysis.findByIdAndDelete(id);

    if (!userAnalysis) {
      return res.status(404).json({ message: "User analysis not found" });
    }

    res.status(200).json({ message: "User analysis deleted successfully" });
  } catch (error) {
    console.error(error); // For debugging purposes
    res
      .status(500)
      .json({ message: "Error deleting user analysis data", error });
  }
};

// Get all User Analysis records (Optional - If we want to list all data)
exports.getAllUserAnalysis = async (req, res) => {
  try {
    const userAnalysis = await UserAnalysis.find();

    if (userAnalysis.length === 0) {
      return res
        .status(404)
        .json({ message: "No user analysis data available" });
    }

    res.status(200).json(userAnalysis);
  } catch (error) {
    console.error(error); // For debugging purposes
    res
      .status(500)
      .json({ message: "Error retrieving all user analysis data", error });
  }
};
