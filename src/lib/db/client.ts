import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export type DB = typeof db
export const db = drizzle(turso);
