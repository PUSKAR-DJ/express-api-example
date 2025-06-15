// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://apiuser:apiuser1234@apiuser.qjqer3z.mongodb.net/?retryWrites=true&w=majority&appName=apiuser',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
