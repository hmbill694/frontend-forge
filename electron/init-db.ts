import { createRequire } from "module";

import fs from "fs";
import path from "path";
import { db } from "./db/client";

global.require = createRequire(import.meta.url);

export default async function initDb() {
  // Get the current working directory.
  const currentWorkingDirectory = process.cwd();

  // Construct the full path to the file.
  const filePath = path.join(
    currentWorkingDirectory,
    import.meta.env.VITE_DATABASE_URL,
  );

  // Check if the file exists before attempting to create it.
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // The file does not exist, so create it.
      fs.writeFile(filePath, "", (err) => {
        if (err) {
          console.error(`Error creating file: ${err.message}`);
          return; // Exit on error
        }
        console.log(`File "forge.db" successfully created at: ${filePath}`);
      });
    } else {
      // The file exists, do nothing.
      console.log(`File "forge.db" already exists at: ${filePath}`);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS projects (
		id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		name text NOT NULL,
		created_at integer NOT NULL,
		updated_at integer NOT NULL
	)`);

  db.run(`CREATE TABLE IF NOT EXISTS chats (
		id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		project_id integer NOT NULL,
		message text NOT NULL,
		sender text NOT NULL,
		created_at integer NOT NULL,
		FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE no action ON DELETE no action
	)`);

  db.run(`CREATE TABLE IF NOT EXISTS components (
		id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		project_id integer NOT NULL,
		name text NOT NULL,
		definition text NOT NULL,
		created_at integer NOT NULL,
		updated_at integer,
		FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE no action ON DELETE no action
	)`);

  db.run(`CREATE TABLE IF NOT EXISTS generated_pages (
		id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
		name text NOT NULL,
		content text NOT NULL,
		created_at integer NOT NULL,
		updated_at integer,
		project_id integer NOT NULL,
		FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE no action ON DELETE no action
	)`);

  console.log("All table stood up successfully.");
}
