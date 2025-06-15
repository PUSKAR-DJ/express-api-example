require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/authMiddleware');
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB Connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user'); // if placed separately
app.use('/api', userRoutes);

// Middleware to log requests
const logRequest = require('./middlewares/logger');
app.use(logRequest);

// Protected route example
app.get('/api/secret', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, this is protected data.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
