import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../db/schema";
import { dataBaseUrl } from "../../../keys"; // const dataBaseUrl = "postgres://user:password@localhost:5432/dbname"; edit this line to match your database connection string
const client = postgres(dataBaseUrl)
const db = drizzle(client, { schema });
export default db;
