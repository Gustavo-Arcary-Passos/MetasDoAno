const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS rotinas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    description TEXT,
    frequency TEXT
)`);

module.exports = db;