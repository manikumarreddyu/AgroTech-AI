const RentProduct = require("../../model/rent/rentProduct");
const User = require("../../model/user");
const mongoose = require("mongoose");

exports.createRental = async (req, res) => {
  const { userId, productId, rentalDuration, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const product = await RentProduct.findById(productId);

    if (!user || !product) {
      console.error("User or Product not found", { userId, productId });
      return res.status(404).json({ message: "User or Product not found" });
    }

    if (product.availabilityStatus !== "available") {
      console.error("Product not available for rent", {
        availabilityStatus: product.availabilityStatus,
      });
      return res
        .status(400)
        .json({ message: "Product not available for rent" });
    }

    switch (rentalDuration) {
      case "hourly":
        if (!product.rentalPricePerHour) {
          return res
            .status(400)
            .json({ message: "Hourly rental price is not set" });
        }
        rentalPrice = product.rentalPricePerHour * quantity; // Assuming hourly rate
        break;
      case "daily":
        if (!product.rentalPricePerDay) {
          return res
            .status(400)
            .json({ message: "Daily rental price is not set" });
        }
        rentalPrice = product.rentalPricePerDay * quantity;
        break;
      case "weekly":
        if (!product.rentalPricePerWeek) {
          return res
            .status(400)
            .json({ message: "Weekly rental price is not set" });
        }
        rentalPrice = product.rentalPricePerWeek * quantity; // Assuming weekly rate
        break;
      case "monthly":
        if (!product.rentalPricePerMonth) {
          return res
            .status(400)
            .json({ message: "Monthly rental price is not set" });
        }
        rentalPrice = product.rentalPricePerMonth * quantity; // Assuming monthly rate
        break;
      default:
        return res.status(400).json({ message: "Invalid rental duration" });
    }

    const rental = {
      rentalId: new mongoose.Types.ObjectId(),
      product: productId,
      quantity,
      rentalDuration,
      rentalDate: new Date(),
      status: "ongoing",
      rentalPrice,
    };

    user.rentals.push(rental);

    product.rentedQuantity += quantity;
    if (product.rentedQuantity > 0) product.availabilityStatus = "rented";

    await product.save();
    await user.save();

    res.status(201).json({ message: "Rental created successfully", rental });
  } catch (error) {
    console.error("Error creating rental:", error);
    res
      .status(500)
      .json({
        message: "Error creating rental",
        error: error.message || error,
      });
  }
};

exports.updateRental = async (req, res) => {
  const { rentalId } = req.params;
  const { rentalDuration, quantity } = req.body;

  try {
    const user = await User.findOne({ "rentals.rentalId": rentalId });
    if (!user) return res.status(404).json({ message: "Rental not found" });

    const rental = user.rentals.id(rentalId);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    rental.rentalDuration = rentalDuration;
    rental.quantity = quantity;

    const product = await RentProduct.findById(rental.product);

    product.rentedQuantity += quantity;

    await product.save();
    await user.save();

    res.status(200).json({ message: "Rental updated successfully", rental });
  } catch (error) {
    res.status(500).json({ message: "Error updating rental", error });
  }
};
exports.cancelRental = async (req, res) => {
  const { rentalId } = req.params;

  try {
    const user = await User.findOne({ "rentals.rentalId": rentalId });
    if (!user) return res.status(404).json({ message: "Rental not found" });

    const rental = user.rentals.id(rentalId);
    if (!rental || rental.status === "returned")
      return res.status(400).json({ message: "Rental cannot be cancelled" });

    rental.status = "cancelled";
    rental.returnDate = new Date();

    const product = await RentProduct.findById(rental.product);

    product.rentedQuantity -= rental.quantity;
    if (product.rentedQuantity === 0) product.availabilityStatus = "available";

    await product.save();
    await user.save();

    res.status(200).json({ message: "Rental cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling rental", error });
  }
};

exports.viewRental = async (req, res) => {
  const { rentalId } = req.params;

  try {
    const user = await User.findOne({ "rentals.rentalId": rentalId }).populate(
      "rentals.product"
    );
    if (!user) return res.status(404).json({ message: "Rental not found" });

    const rental = user.rentals.id(rentalId);
    res.status(200).json({ rental });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving rental details", error });
  }
};

exports.returnRental = async (req, res) => {
  const { rentalId } = req.params;

  try {
    const user = await User.findOne({ "rentals.rentalId": rentalId });
    if (!user) return res.status(404).json({ message: "Rental not found" });

    const rental = user.rentals.id(rentalId);
    if (!rental || rental.status === "returned")
      return res
        .status(400)
        .json({ message: "Rental is already returned or invalid" });

    rental.status = "returned";
    rental.returnDate = new Date();

    const product = await RentProduct.findById(rental.product);
    product.rentedQuantity -= rental.quantity;
    if (product.rentedQuantity === 0) product.availabilityStatus = "available";

    await product.save();
    await user.save();

    res.status(200).json({ message: "Rental returned successfully", rental });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking rental as returned", error });
  }
};
