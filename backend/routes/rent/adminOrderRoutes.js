const express = require('express');
const { adminCreateRental, getAllOrders, getSpecificOrder, updateOrder, deleteOrder, bulkUpdateOrders } = require('../../controllers/rent/AdminOrderController');
const router = express.Router();


// Create a new order (Rental)
router.post('/rent-orders', adminCreateRental );

// Get all orders
router.get('/rent-orders', getAllOrders);

// Get a specific order by rentalId
router.get('/rent-orders/:rentalId', getSpecificOrder );

// Update an order (change rental status or quantity)
router.put('/rent-orders/:rentalId',updateOrder );

// Delete an order
router.delete('/rent-orders/:rentalId', deleteOrder )

// Bulk update orders (e.g., change multiple order statuses at once)
router.put('/rent-orders/bulk-update', bulkUpdateOrders);``

module.exports = router;
