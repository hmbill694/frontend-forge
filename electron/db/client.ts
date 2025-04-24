import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Import better-sqlite3
const Database = require("better-sqlite3");

// Assuming your database file (e.g., 'mydatabase.db') is in your 'resources' folder
const databasePath = path.resolve(import.meta.env.VITE_DATABASE_URL);

// Create a new SQLite database instance
const database = new Database(databasePath, { verbose: console.log });

export type DB = typeof db;
export const db = drizzle(database);
