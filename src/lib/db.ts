import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import db_url from "../../keys";

const connectionString = db_url
const client = postgres(connectionString)
const db = drizzle(client);
export default db;