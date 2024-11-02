const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
      return res.status(401).json({ message: 'Invalid credentials' });
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

