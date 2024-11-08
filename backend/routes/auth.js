const express = require("express");
const router = express.Router();

const {
  signupController,
  signinController,
  forgotPasswordController,
  verifyOtpController,
  resetPasswordController,
  checkUsernameAvailability,
  verifyEmail,
  checkEmailAvailability
} = require("../controllers/authController");

router.post("/signup", signupController);
router.get("/check-username/:username", checkUsernameAvailability);
router.get("/check-email/:email", checkEmailAvailability);
router.get("/verify-account", verifyEmail);

// Login Route
router.post("/signin", signinController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOtpController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
