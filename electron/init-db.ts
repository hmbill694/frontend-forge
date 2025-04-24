// import { db } from "./db/client";
// import * as schema from "./db/schema";
// import {
//   generateSQLiteDrizzleJson,
//   generateSQLiteMigration,
// } from "drizzle-kit/api";

// export const initDb = async () => {
//   const [previous, current] = await Promise.all(
//     [{}, schema].map((schemaObject) => generateSQLiteDrizzleJson(schemaObject)),
//   );

//   const statements = await generateSQLiteMigration(previous, current);

//   const migration = statements.join("\n");

//   db.run(migration);

//   console.log("migrations ran successfully");
// };
