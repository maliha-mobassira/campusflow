const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path where the SQLite database file will be stored
const dbPath = path.resolve(__dirname, 'campusflow.db');

// Connect to SQLite database (creates campusflow.db if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log(`Connected to SQLite database at: ${dbPath}`);
    initSchema();
  }
});

// Read and execute schema.sql to initialize the tables
function initSchema() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  db.exec(schemaSql, (err) => {
    if (err) {
      console.error('Error executing schema.sql:', err.message);
    } else {
      console.log('Database initialized: students table is ready.');
    }
  });
}

module.exports = db;
