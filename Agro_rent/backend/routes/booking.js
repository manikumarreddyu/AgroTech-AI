const express = require('express');
const router = express.Router();
const {getBookings, getBooking, createBooking, updateBooking, deleteBooking} = require('../controllers/bookingController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/all', getBookings);
router.get('/', getBooking);
router.post('/', createBooking);
router.put('/', updateBooking);
router.delete('/', deleteBooking);

module.exports = router;
