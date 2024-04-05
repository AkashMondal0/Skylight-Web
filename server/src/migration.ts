import dotenv from "dotenv";
// import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import postgres from "postgres";
import db from "./db-connections/postgresql";
dotenv.config();

const migrateDb = async () => {
    migrate(db, {
        migrationsFolder: "../drizzle",
    })
}

migrateDb();