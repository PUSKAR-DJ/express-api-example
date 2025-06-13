const express = require('express');
const { db, initDB } = require('./db');

const app = express();
app.use(express.json());

initDB(); // initialize DB at start

// GET route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

// ✅ POST route - save data to JSON
app.post('/api/echo', async (req, res) => {
  const userData = req.body;

  await db.read(); // always read before writing
  db.data.users.push(userData); // save to "users" array
  await db.write(); // save changes

  res.json({
    message: 'Data saved to database!',
    data: userData
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
