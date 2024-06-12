const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./vibez-md.db');

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL)');
});

module.exports = db;
