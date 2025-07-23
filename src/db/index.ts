import "dotenv/config";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import * as schema from "./schema.js";
const db = drizzleLibsql({
  connection: {
    url: process.env.TURSO_CONNECTION_URL! as string,
    authToken: process.env.TURSO_AUTH_TOKEN! as string
  },
  casing: "snake_case",
  schema,
});

export default db;
