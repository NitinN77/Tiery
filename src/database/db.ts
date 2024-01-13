import "dotenv/config"
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const DB_URI = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

export const migrationClient = postgres(DB_URI, { max: 1 })

declare global {
  var db: PostgresJsDatabase | undefined
}

let db: PostgresJsDatabase

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(DB_URI))
} else {
  if (!global.db) global.db = drizzle(postgres(DB_URI))

  db = global.db
}

export { db }
