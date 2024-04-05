import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../schema";
import { config } from "../config";

const client = postgres(config.database.PostgresqlUrl as string)
const db = drizzle(client, { schema });
export default db;