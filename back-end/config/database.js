const sqlite3 = require('sqlite3').verbose();
const dbname = "data.db";
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');

// Initialiser la base de données SQLite
const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('database connected to ' + dbname);
  }
});

module.exports = db;

