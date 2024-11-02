const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


exports.signupController = async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newUser = new User({ firstName, lastName, email, password, role });
      await newUser.save();
  
      // Include role in the token
      const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'User created', token });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: 'Signup failed' });
    }
}

exports.signinController = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body; 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const tokenExpiry = rememberMe ? '7d' : '1h'; 

    
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
        <p>The Rentalog Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email address." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
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

