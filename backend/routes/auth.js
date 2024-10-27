const express = require('express');
const router = express.Router();

const { signupController, signinController } = require('../controllers/authController');

// Signup Route
router.post('/signup', signupController);

// Login Route
router.post('/signin', signinController );

module.exports = router;
