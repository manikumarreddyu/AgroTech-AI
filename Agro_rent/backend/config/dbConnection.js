const mongoose = require('mongoose');

// Connect to the database
const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        mongoose.connection;
        console.log(`MongoDB Connected: ${conn.connection.host} :${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;