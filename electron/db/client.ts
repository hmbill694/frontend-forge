import fs from "fs";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assuming your database file (e.g., 'mydatabase.db') is in your 'resources' folder
const databasePath = path.join(__dirname, "resources", "forge.db");

console.log("db-client - Database Path:", databasePath);

// Create a new SQLite database instance
const database = new Database(databasePath);

export type DB = typeof db;
export const db = drizzle({ client: database });

function fileExists(filePath: string) {
  try {
    // Use fs.accessSync() to check if the file exists.
    // fs.accessSync() throws an error if the file does not exist,
    // or if the process does not have the permissions to access the file.
    fs.accessSync(filePath, fs.constants.F_OK);
    return true; // If fs.accessSync() does not throw, the file exists.
  } catch (err) {
    // Catch any error that fs.accessSync() might throw.  This includes
    // ENOENT (file not found) and EACCES (permission denied) errors.
    return false; // Return false if any error occurs.
  }
}

console.log(
  `${import.meta.env.VITE_DATABASE_URL} exists ${fileExists(import.meta.env.VITE_DATABASE_URL)}`,
);
