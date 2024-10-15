const asyncHandler = require('express-async-handler');
const Review = require('../models/review');

//@desc Get all reviews for particular machine 
//@route GET /api/review/
//@access Private
//@desc Get all reviews for particular machine 
//@route GET /api/review/all
//@access Private
const getReviews = asyncHandler(async (req, res) => {
    const { machineId } = req.query; // Change to req.query to get the machineId from query params
    const reviews = await Review.find({ machineId })
        .populate('bookingId')
        .populate('ownerId')
        .populate('userId') // Ensure userId is populated
        .select('-password')
        .populate('machineId');

    res.status(200).json({ message: "Success", reviews });
});



//@desc Get review by ID for particular booking
//@route GET /api/review/
//@access Private
const getReview = asyncHandler(async (req, res) => {
    const {bookingId} = req.body;
    const review = await Review.findOne({ bookingId })
        .populate('bookingId')
        .populate('ownerId')
        .populate('userId').select('-password')
        .populate('machineId');
    res.status(200).json({ message : "Success", review });
});

//@desc Register review
//@route POST /api/review
//@access Public
const createReview = asyncHandler(async (req, res) => {
    const { ownerId, machineId, bookingId, comment, rating } = req.body;
    const newReview = new Review({
        userId : req.user.id,   
        ownerId,
        machineId,
        bookingId,
        comment,
        rating
    }); 
    const createdReview = await newReview.save();
    res.status(201).json({ message : "Success", createdReview });
});

//@desc Update review
//@route PUT /api/review/
//@access Public
const updateReview = asyncHandler(async (req, res) => {
    if (req.user.role === 'owner') {
        return res.status(401).json({ message: "Unauthorized" }); // Use 'return' to stop further execution
    }

    const { reviewId, comment, rating } = req.body;
    const review = await Review.findById(reviewId);

    if (review) {
        review.comment = comment;
        review.rating = rating;
        const updatedReview = await review.save();
        return res.status(201).json({ message: "Success", updatedReview }); // Always use return
    } else {
        return res.status(404).json({ message: "Review not found" }); // Return ensures no additional responses
    }
});


//@desc Delete review
//@route DELETE /api/review/
//@access Public
const deleteReview = asyncHandler(async (req, res) => {
    if (req.user.role === 'owner') {
        return res.status(401).json({ message: "Unauthorized" }); // Use return
    }

    const { reviewId } = req.body;
    const review = await Review.findById(reviewId);

    if (review) {
        await review.deleteOne();
        return res.status(200).json({ message: "Review deleted" }); // Use return
    } else {
        return res.status(404).json({ message: "Review not found" }); // Use return
    }
});


module.exports = { getReviews, getReview, createReview, updateReview, deleteReview };
