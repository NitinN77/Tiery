import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { migrationClient } from "./db"

const client = drizzle(migrationClient)

async function applyMigrations() {
  await migrate(client, { migrationsFolder: "src/database/migrations/" })
  await migrationClient.end()
}

applyMigrations()
