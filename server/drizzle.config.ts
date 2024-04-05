import type { Config } from "drizzle-kit";
import dotEvn from "dotenv";
dotEvn.config();

export default {
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;