const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

db.exec(`CREATE TABLE IF NOT EXISTS rotinas (
    nome TEXT PRIMARY KEY,  -- Tornando o nome a chave primária
    description TEXT,
    frequency TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS rotinas_historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data TEXT,
    FOREIGN KEY (nome) REFERENCES rotinas(nome) ON DELETE CASCADE
)`);

module.exports = db;