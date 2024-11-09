const mongoose = require('mongoose')
const User = require('../../model/user');
const RentProduct = require('../../model/rent/rentProduct');

exports.adminCreateRental = async (req, res) => {
    try {
      const { userId, productId, rentalDuration, quantity } = req.body;
  
      // Validate inputs
      if (!userId || !productId || !rentalDuration || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const product = await RentProduct.findById(productId);
      if (!product || product.availabilityStatus !== 'available') {
        return res.status(404).json({ message: 'Product not available for rent' });
      }
  
      // Create the order (rental) for the user
      const rental = {
        rentalId: new mongoose.Types.ObjectId(),
        product: productId,
        rentalDuration,
        quantity,
        rentalDate: new Date(),
        returnDate: null,
        status: 'ongoing',
      };
  
      // Add the rental to the user's rentals array
      user.rentals.push(rental);
  
      // Update the product availability status
      product.availabilityStatus = 'rented';
      product.rentedQuantity += quantity;
  
      await user.save();
      await product.save();
  
      res.status(201).json({ message: 'Order created successfully', rental });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  exports.getAllOrders = async (req, res) => {
    try {
      const users = await User.find().populate({
        path: 'rentals.product',
        select: 'name description price image',
      });
  
      const orders = users.flatMap(user => user.rentals);
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  exports.getSpecificOrder = async (req, res) => {
    try {
      const { rentalId } = req.params;
  
      const user = await User.findOne({ 'rentals.rentalId': rentalId }).populate({
        path: 'rentals.product',
        select: 'name description price image',
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const rental = user.rentals.find(rental => rental.rentalId.toString() === rentalId);
      res.status(200).json(rental);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  exports.updateOrder = async (req, res) => {
    try {
      const { rentalId } = req.params;
      const { status, quantity, returnDate } = req.body;
  
      // Validate inputs
      if (!status && !quantity && !returnDate) {
        return res.status(400).json({ message: 'Nothing to update' });
      }
  
      const user = await User.findOne({ 'rentals.rentalId': rentalId });
      if (!user) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const rental = user.rentals.find(rental => rental.rentalId.toString() === rentalId);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found in user data' });
      }
  
      // Update the rental status and/or quantity
      if (status) rental.status = status;
      if (quantity) rental.quantity = quantity;
      if (returnDate) rental.returnDate = returnDate;
  
      // If the order is returned, update the product's availability
      if (rental.status === 'returned' || rental.status === 'cancelled') {
        const product = await RentProduct.findById(rental.product);
        product.availabilityStatus = 'available';
        product.rentedQuantity -= rental.quantity;
        await product.save();
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Order updated successfully', rental });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  exports.deleteOrder =  async (req, res) => {
    try {
      const { rentalId } = req.params;
  
      const user = await User.findOne({ 'rentals.rentalId': rentalId });
      if (!user) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const rentalIndex = user.rentals.findIndex(rental => rental.rentalId.toString() === rentalId);
      if (rentalIndex === -1) {
        return res.status(404).json({ message: 'Rental not found in user data' });
      }
  
      // Remove the rental from the user's rentals array
      user.rentals.splice(rentalIndex, 1);
  
      const rental = user.rentals[rentalIndex];
  
      // Update the product availability
      const product = await RentProduct.findById(rental.product);
      product.availabilityStatus = 'available';
      product.rentedQuantity -= rental.quantity;
      await product.save();
  
      await user.save();
  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  exports.bulkUpdateOrders = async (req, res) => {
    try {
      const { rentalIds, status } = req.body;
  
      if (!rentalIds || !Array.isArray(rentalIds) || rentalIds.length === 0 || !status) {
        return res.status(400).json({ message: 'Invalid input' });
      }
  
      const users = await User.find({ 'rentals.rentalId': { $in: rentalIds } });
      const updatedRentals = [];
  
      for (const user of users) {
        for (const rental of user.rentals) {
          if (rentalIds.includes(rental.rentalId.toString())) {
            rental.status = status;
            if (status === 'returned' || status === 'cancelled') {
              const product = await RentProduct.findById(rental.product);
              product.availabilityStatus = 'available';
              product.rentedQuantity -= rental.quantity;
              await product.save();
            }
            updatedRentals.push(rental);
          }
        }
        await user.save();
      }
  
      res.status(200).json({ message: 'Orders updated successfully', updatedRentals });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }