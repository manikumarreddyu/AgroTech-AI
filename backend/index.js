const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/Contactroute');
const shopRoutes = require('./routes/shop')
const googleauth = require('./routes/googleauth')
const agriProductRoutes = require('./routes/agriProductRoutes');

const discussionRoutes = require('./routes/discussionRoutes');

const  rentProductRoutes = require('./routes/rent/rentProductRoutes');

const { sendEmail } = require('./services/emailService');
const session = require('express-session');
const passport = require('passport');
const authMiddleware = require('./middleware/auth');
const bcrypt = require('bcryptjs')
require("./services/passport")
const geminiChatRoute = require('./routes/geminiChatRoute');
const app = express();

app.use(cors()); // This allows all origins to access your API

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "10mb" }));
app.use('/auth', authRoutes);
app.use('/auth', googleauth);
app.use('/api', contactRoutes);
app.use('/api', shopRoutes);
app.use('/api', rentProductRoutes);
app.use('/api', userRoutes); 
app.use('/api/discussions', discussionRoutes);
app.use('/api/products', agriProductRoutes);
app.use('/api/generate-content', geminiChatRoute);


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
  .connect(process.env.MONGODB_URL)
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