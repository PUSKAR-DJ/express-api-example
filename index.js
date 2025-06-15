const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/authMiddleware');
const app = express();

mongoose.connect('mongodb+srv://apiuser:apiuser1234@apiuser.qjqer3z.mongodb.net/?retryWrites=true&w=majority&appName=apiuser').then(() => console.log('✅ DB Connected'));

app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user'); // if placed separately
app.use('/api', userRoutes);

// Middleware to log requests
const logRequest = require('./logs/logger');
app.use(logRequest);

// Protected route example
app.get('/api/secret', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, this is protected data.` });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
