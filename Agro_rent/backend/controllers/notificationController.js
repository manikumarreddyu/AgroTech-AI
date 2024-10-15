const asyncHandler = require('express-async-handler');
const Notification = require('../models/notification');

//@desc Get all notifications
//@route GET /api/notification
//@access Private
const getNotifications = asyncHandler(async (req, res) => {
});

//@desc Get notification by ID
//@route GET /api/notification/
//@access Private
const getNotification = asyncHandler(async (req, res) => {
});

//@desc Register notification
//@route POST /api/notification
//@access Public
const createNotification = asyncHandler(async (req, res) => {
});

//@desc Update notification
//@route PUT /api/notification/
//@access Public
const updateNotification = asyncHandler(async (req, res) => {
});

//@desc Delete notification
//@route DELETE /api/notification/
//@access Public
const deleteNotification = asyncHandler(async (req, res) => {
});

module.exports = { getNotifications, getNotification, createNotification, updateNotification, deleteNotification };


