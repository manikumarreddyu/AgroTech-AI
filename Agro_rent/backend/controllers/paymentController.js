const asyncHandler = require('express-async-handler');
const Payment = require('../models/payment');

//@desc Get all payments
//@route GET /api/payment
//@access Private
const getPayments = asyncHandler(async (req, res) => {
});

//@desc Get payment by ID
//@route GET /api/payment/
//@access Private
const getPayment = asyncHandler(async (req, res) => {
});

//@desc Register payment
//@route POST /api/payment
//@access Public
const createPayment = asyncHandler(async (req, res) => {
});

//@desc Update payment
//@route PUT /api/payment/
//@access Public
const updatePayment = asyncHandler(async (req, res) => {
});

//@desc Delete payment
//@route DELETE /api/payment/
//@access Public
const deletePayment = asyncHandler(async (req, res) => {
});

module.exports = { getPayments, getPayment, createPayment, updatePayment, deletePayment };
