import "dotenv/config"
// import { dataBaseUrl } from "./keys";
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = "";
const postgresClient = postgres(connectionString, { max: 1 });
const postgresDb = drizzle(postgresClient);

const main = async () => {
    try {
        await migrate(postgresDb, { migrationsFolder: 'drizzle' });
        await postgresClient.end();
        console.log('Migration completed')
    } catch (error) {
        console.error(error);
        await postgresClient.end();
    }
}

main()