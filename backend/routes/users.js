const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth.js');
const { submitRating } = require('../controllers/rating.js');

// Get User by ID
router.get('/users/:id', );


router.post('/rating', authenticateJWT, submitRating);

module.exports = router;
