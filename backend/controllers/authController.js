const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../services/emailUtils');


exports.signinController = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body; 
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      // Generate a new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      user.verificationToken = verificationToken;
      
      // Save the updated user with the new verification token
      await user.save();

      // Send the verification email
      await sendVerificationEmail(user.email, verificationToken);

      // Return a response saying the user needs to verify their email
      return res.status(403).json({
        message: 'User is not verified. Please verify your email.'
      });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set token expiry based on rememberMe flag
    const tokenExpiry = rememberMe ? '7d' : '1h'; 

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    const user_id = user._id.toString();
    res.status(200).json({ message: 'Login successful', token, user_id, tokenExpiry });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.resetPasswordOTP || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired or invalid." });
    }

    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({ message: "Incorrect OTP." });
    }

    res.status(200).json({ message: "OTP verified. Proceed to reset password." });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};
exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Agro-tech AI Support" <support@agrotechai.com>',
      to: user.email,
      subject: "Your Password Reset OTP",
      html: `
        <h3>Password Reset Request</h3>
        <p>Hello ${user.firstName},</p>
        <p>We received a request to reset your password. Use the OTP below to reset it. This OTP is valid for 10 minutes.</p>
        <h2>${otp}</h2>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,</p>
        <p>The AgroTech-AI Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email address." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};



exports.resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

  
    if (!user || user.resetPasswordOTP !== otp || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;  
  
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();  

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};


exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    res.status(200).json({ message: 'Username is available' });
  } catch (error) {
    res.status(500).json({ message: 'Error checking username availability' });
  }
};

exports.checkEmailAvailability = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });

    if (user) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    res.status(200).json({ message: 'Email is available' });
  } catch (error) {
    res.status(500).json({ message: 'Error checking email availability' });
  }
};



exports.signupController = async (req, res) => {
  const {  firstName, lastName,username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const newUser = new User({ username,firstName,lastName, email, password, verificationToken });

    await sendVerificationEmail(email, verificationToken);

    await newUser.save();
    res.status(201).json({ message: 'Please check your email to verify your account' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};


exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Remove the token after verification
    await user.save();

    res.status(200).json({ message: 'Account successfully verified' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email' });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Account is already verified' });
    }

    // Generate a new verification token and resend the email
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    
    // Save the updated user and resend the email
    await user.save();
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ message: 'Verification email resent. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending verification email' });
  }
};


exports.updateUserProfile = async (req, res) => {
  const {userId} = req.query;  // Retrieved from authentication middleware
  const { firstName, lastName, username, email, address } = req.body;

  // Validate the fields
  if (firstName.length < 2 || lastName.length < 2) {
    return res.status(400).json({ message: 'First and Last names must be at least 2 characters long.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update the fields only if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating profile', error });
  }
};

