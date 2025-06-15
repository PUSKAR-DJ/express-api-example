const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// GET all users (admin/testing purpose)
router.get('/users', authMiddleware, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// GET one user by ID
router.get('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// UPDATE user by ID
router.put('/users/:id', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // Don't allow password change here
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated', user });
  } catch {
    res.status(400).json({ error: 'Update failed' });
  }
});

// DELETE user by ID
router.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch {
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;
