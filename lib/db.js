import Database from "better-sqlite3";

// Le fichier DB (local, autonome)
const db = new Database("db.sqlite");

// Sécurité basique
db.pragma("journal_mode = WAL");

export default db;
