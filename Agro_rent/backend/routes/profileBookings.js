const express = require('express');
const { getProfileBookings } = require('../controllers/profileBookingsController');
const router = express.Router();

router.get('/:userId', getProfileBookings); // Adjust the path as necessary

module.exports = router;
