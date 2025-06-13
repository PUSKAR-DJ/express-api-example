// index.js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample GET API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

// ✅ POST route
app.post('/api/echo', (req, res) => {
  const userInput = req.body;
  res.json({
    message: 'Data received successfully!',
    data: userInput
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
