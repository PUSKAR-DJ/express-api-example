// index.js
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample GET API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
