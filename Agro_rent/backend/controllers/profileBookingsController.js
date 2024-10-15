const Booking = require("../models/booking");

exports.getProfileBookings = async (req, res) => {
    const userId = req.params.userId;

    try {
        const bookings = await Booking.find({ userId })
            .populate('machineId')  // Populates machine details
            .populate('userId');    // Populates user details (if needed)
        
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
