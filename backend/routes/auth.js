const express = require('express');
const router = express.Router();

const { signupController, signinController, forgotPasswordController, verifyOtpController, resetPasswordController } = require('../controllers/authController');

// Signup Route
router.post('/signup', signupController);

// Login Route
router.post('/signin', signinController );
router.post('/forgot-password', forgotPasswordController);
router.post('/verify-otp', verifyOtpController);
router.post('/reset-password', resetPasswordController);

module.exports = router;
