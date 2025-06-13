// db.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

// Use JSON file for storage
const adapter = new JSONFile('data.json');
const db = new Low(adapter);

// Initialize default data if empty
async function initDB() {
  await db.read();
  db.data ||= { users: [] }; // default structure
  await db.write();
}

module.exports = { db, initDB };
