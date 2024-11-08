const express = require('express');
const router = express.Router();
const { createReturn, updateReturnStatus, getReturnInformation, getUserReturnHistory, getPendingReturns, cancelReturnRequest, getAllReturnedProducts, getAllDamagedProducts, getReturnRequestsForProduct } = require('../../controllers/shop/sub-controllers/returnController');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Route to create a return request
router.post('/returns', authenticateUser, createReturn);

// Route to update return status (Admin only)
router.patch('/returns/:id', authenticateUser, authorizeAdmin, updateReturnStatus);

// Route to get return information
router.get('/returns/:id', authenticateUser, getReturnInformation);

// Route to get a user's return history
router.get('/returns/user/:userId', authenticateUser, getUserReturnHistory);

// Route to get all pending returns (Admin only)
router.get('/returns/pending', authenticateUser, authorizeAdmin, getPendingReturns);

// Route to cancel return request
router.patch('/returns/cancel/:id', authenticateUser, cancelReturnRequest);

// Route to get all returned products (Admin only)
router.get('/returns/returned', authenticateUser, authorizeAdmin, getAllReturnedProducts);

// Route to get all damaged products (Admin only)
router.get('/returns/damaged', authenticateUser, authorizeAdmin, getAllDamagedProducts);

// Route to get return requests for a specific product (Admin only)
router.get('/returns/product/:productId', authenticateUser, authorizeAdmin, getReturnRequestsForProduct);

module.exports = router;
