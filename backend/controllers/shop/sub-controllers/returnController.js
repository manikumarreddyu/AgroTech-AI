
const ReturnProduct = require('../models/ReturnProduct');
const Product = require('../models/Product');
const User = require('../models/User');

// Create Return (POST /api/returns)
exports.createReturn = async (req, res) => {
  try {
    const { productId, returnDate, condition } = req.body;
    const userId = req.user.id; // Assuming user authentication is in place

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Check if the product has already been returned
    const existingReturn = await ReturnProduct.findOne({ productId, userId, status: 'returned' });
    if (existingReturn) {
      return res.status(400).json({ message: 'Product has already been returned.' });
    }

    const returnRequest = new ReturnProduct({
      productId,
      userId,
      returnDate,
      condition,
      status: 'pending'
    });

    await returnRequest.save();
    res.status(201).json({ message: 'Return request created successfully.', returnRequest });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Update Return Status (PATCH /api/returns/:id)
exports.updateReturnStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const returnId = req.params.id;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const returnRequest = await ReturnProduct.findById(returnId);
    if (!returnRequest) {
      return res.status(404).json({ message: 'Return request not found.' });
    }

    // Ensure that only admins can update the status
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    returnRequest.status = status;
    returnRequest.updatedAt = Date.now();
    await returnRequest.save();

    res.status(200).json({ message: 'Return status updated successfully.', returnRequest });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Get Return Information (GET /api/returns/:id)
exports.getReturnInformation = async (req, res) => {
  try {
    const returnId = req.params.id;
    const returnRequest = await ReturnProduct.findById(returnId)
      .populate('productId')
      .populate('userId');

    if (!returnRequest) {
      return res.status(404).json({ message: 'Return request not found.' });
    }

    // Check if the user is authorized to view return details
    if (req.user.id !== returnRequest.userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }

    res.status(200).json(returnRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Get User’s Return History (GET /api/returns/user/:userId)
exports.getUserReturnHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }

    const returnHistory = await ReturnProduct.find({ userId })
      .populate('productId')
      .populate('userId');

    if (!returnHistory.length) {
      return res.status(404).json({ message: 'No return history found.' });
    }

    res.status(200).json(returnHistory);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Get All Pending Returns (GET /api/returns/pending)
exports.getPendingReturns = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required.' });
    }

    const pendingReturns = await ReturnProduct.find({ status: 'pending' })
      .populate('productId')
      .populate('userId');

    if (!pendingReturns.length) {
      return res.status(404).json({ message: 'No pending returns found.' });
    }

    res.status(200).json(pendingReturns);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Cancel Return Request (PATCH /api/returns/cancel/:id)
exports.cancelReturnRequest = async (req, res) => {
    try {
      const returnId = req.params.id;
      const returnRequest = await ReturnProduct.findById(returnId);
  
      if (!returnRequest) {
        return res.status(404).json({ message: 'Return request not found.' });
      }
  
      // Check if the return request is still pending
      if (returnRequest.status !== 'pending') {
        return res.status(400).json({ message: 'Return request cannot be canceled once it is processed.' });
      }
  
      // Ensure that the user is the one who made the return request
      if (returnRequest.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to cancel this return request.' });
      }
  
      returnRequest.status = 'canceled';
      returnRequest.updatedAt = Date.now();
      await returnRequest.save();
  
      res.status(200).json({ message: 'Return request canceled successfully.', returnRequest });
    } catch (err) {
      res.status(500).json({ message: 'Server error.', error: err.message });
    }
  };

  // Get All Returned Products (GET /api/returns/returned)
exports.getAllReturnedProducts = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required.' });
      }
  
      const returnedProducts = await ReturnProduct.find({ status: 'returned' })
        .populate('productId')
        .populate('userId');
  
      if (!returnedProducts.length) {
        return res.status(404).json({ message: 'No returned products found.' });
      }
  
      res.status(200).json(returnedProducts);
    } catch (err) {
      res.status(500).json({ message: 'Server error.', error: err.message });
    }
  };

  // Get All Damaged Products (GET /api/returns/damaged)
exports.getAllDamagedProducts = async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required.' });
      }
  
      const damagedProducts = await ReturnProduct.find({ condition: 'damaged' })
        .populate('productId')
        .populate('userId');
  
      if (!damagedProducts.length) {
        return res.status(404).json({ message: 'No damaged products found.' });
      }
  
      res.status(200).json(damagedProducts);
    } catch (err) {
      res.status(500).json({ message: 'Server error.', error: err.message });
    }
  };

  // Get Return Requests for a Specific Product (GET /api/returns/product/:productId)
exports.getReturnRequestsForProduct = async (req, res) => {
    try {
      const { productId } = req.params;
  
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required.' });
      }
  
      const returnRequests = await ReturnProduct.find({ productId })
        .populate('productId')
        .populate('userId');
  
      if (!returnRequests.length) {
        return res.status(404).json({ message: 'No return requests found for this product.' });
      }
  
      res.status(200).json(returnRequests);
    } catch (err) {
      res.status(500).json({ message: 'Server error.', error: err.message });
    }
  };
  