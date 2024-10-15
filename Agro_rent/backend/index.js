const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/user');
const swagger = require('./swagger');
const cors = require('cors')
const profileMachinesRoutes = require('./routes/profileMachines')
const profileBookingsRoutes= require('./routes/profileBookings')
const imageRoutes=require('./routes/imageRoutes')


  
connectDB();
const app = express();
const port = process.env.PORT || 3000;
// middleware/upload.js
const multer = require('multer');
// Configure multer for file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Route to handle file upload
app.post('/upload', upload.single('avatar'), async (req, res) => {
    try {
      const { name, mobile, password } = req.body;
      const user = new User({ name, mobile, password, avatar: req.file.buffer });
      await user.save();
      res.status(201).send('File uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
console.log("New Request");
app.use("/api/user", require("./routes/user"));
app.use("/api/owner", require("./routes/owner"));
app.use("/api/machine", require("./routes/machine"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/review", require("./routes/review"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/notification", require("./routes/notification"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/image", require("./routes/image"));
app.use('/api/profile/machines', profileMachinesRoutes);
app.use('/api/profile/bookings', profileBookingsRoutes);
app.use('/api/image', imageRoutes);
app.use(swagger);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

