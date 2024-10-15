const asyncHandler = require('express-async-handler');
const Booking = require('../models/booking');

//@desc Get all bookings
//@route GET /api/booking
//@access Private
const getBookings = asyncHandler(async (req, res) => {
    const {role, id} = req.body;
    if(role === "farmer"){
        const bookings = await Booking.find({userId: id})
        .populate('machineId')
        .populate('ownerId')
        .populate('reviews');
        res.status(200).json({message: 'Success', bookings});
    }
    else if(role === "owner"){
        const bookings = await Booking.find({ownerId: id})
        .populate('machineId')
        .populate('userId')
        .populate('reviews');

        res.status(200).json({message: 'Success', bookings});
    }
    else{
        res.status(401).json({message: 'Unauthorized'});
    }
});

//@desc Get booking by ID
//@route GET /api/booking/
//@access Private
const getBooking = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const booking = await Booking.findById(id)
    .populate('machineId')
    .populate('ownerId')
    .populate('userId')
    .populate('reviews');
    if(!booking){
        return res.status(404).json({message: 'Booking not found'});
    }
    res.status(200).json({message: 'Success', booking});

});

//@desc Register booking
//@route POST /api/booking
//@access Public
const createBooking = asyncHandler(async (req, res) => {
    const { ownerId, machineId, startDate, endDate, totalDuration, totalCost, status, paymentStatus, reviews } = req.body;
    const booking = new Booking({
        userId : req.user.id,
        ownerId,
        machineId,
        startDate,
        endDate,
        totalDuration,
        totalCost,
        status,
        paymentStatus,
        reviews
    });
    booking.save().then(booking => {
        res.status(201).json({message: 'Booking created', booking});
    }).catch(err => {
        console.log(err);
    });    
});

//@desc Update booking
//@route PUT /api/booking/
//@access Public
const updateBooking = asyncHandler(async (req, res) => {
    const { id, ownerId, machineId, startDate, endDate, totalDuration, totalCost, status, paymentStatus, reviews } = req.body;
    const booking = await Booking.findById(id)
    .populate('machineId')
    .populate('ownerId')
    .populate('userId')
    .populate('reviews');
    if(!booking){
        return res.status(404).json({message: 'Booking not found'});
    }
    booking.ownerId = ownerId || booking.ownerId;
    booking.machineId = machineId || booking.machineId;
    booking.startDate = startDate || booking.startDate;
    booking.endDate = endDate || booking.endDate;
    booking.totalDuration = totalDuration || booking.totalDuration;
    booking.totalCost = totalCost || booking.totalCost;
    booking.status = status || booking.status;
    booking.paymentStatus = paymentStatus || booking.paymentStatus;
    booking.reviews = reviews || booking.reviews;
    booking.save().then(booking => {
        res.status(200).json({message: 'Booking updated', booking});
    }).catch(err => {
        console.log(err);
    });
});

//@desc Delete booking
//@route DELETE /api/booking/
//@access Public
const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const booking = await Booking.findById(id)
    .populate('machineId')
    .populate('ownerId')
    .populate('userId')
    .populate('reviews');
    if(!booking){
        return res.status(404).json({message: 'Booking not found'});
    }
    booking.remove().then(() => {
        res.status(200).json({message: 'Booking deleted'});
    }).catch(err => {
        console.log(err);
    });
});

module.exports = { getBookings, getBooking, createBooking, updateBooking, deleteBooking };
