import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite", // 'mysql' | 'sqlite' | 'turso'
  schema: "./electron/db/schema.ts",
});
