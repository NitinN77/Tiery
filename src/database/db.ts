import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const DB_URI = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

export const migrationClient = postgres(DB_URI, { max: 1 })

const queryClient = postgres(DB_URI)
export const db = drizzle(queryClient)
