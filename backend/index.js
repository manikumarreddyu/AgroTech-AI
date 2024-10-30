const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/Contactroute');
const shopRoutes = require('./routes/shop')
const agriProductRoutes = require('./routes/agriProductRoutes');
const { sendEmail } = require('./services/emailService');
const authMiddleware = require('./middleware/auth');
const bcrypt = require('bcryptjs')
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use('/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', shopRoutes);
app.use('/api', userRoutes); 
app.use('/api/products', agriProductRoutes);

app.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  
  try {
    await sendEmail(to, subject, body);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/agrotech')
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 