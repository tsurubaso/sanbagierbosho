//Execute this file once to initialize the database
//node lib/init-db.js


import db from "./db.js";

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    imageUrl TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("DB initialized");
