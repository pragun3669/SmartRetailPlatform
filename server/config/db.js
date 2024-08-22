const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/retail'; // MongoDB URI for the 'retail' database

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
