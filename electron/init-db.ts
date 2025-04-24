import fs from "fs";
import path from "path";

export default function initDb() {
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
}
