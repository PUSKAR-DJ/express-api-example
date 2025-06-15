const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());

connectDB(); // connect to MongoDB Atlas

// POST route
app.post('/api/echo', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: 'User saved!', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// GET all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
