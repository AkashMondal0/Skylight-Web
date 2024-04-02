import type { Config } from "drizzle-kit";
import db_url from "./keys";


export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: db_url,
  },
} satisfies Config;