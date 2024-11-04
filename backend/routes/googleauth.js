const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initiate Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback URL for Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    // Redirect to the dashboard or home page on success
    res.redirect('http://localhost:5173/');
  }
);

module.exports = router;
