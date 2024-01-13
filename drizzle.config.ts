import "dotenv/config"
import type { Config } from "drizzle-kit"

export default {
  schema: "src/database/schema.ts",
  out: "src/database/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.PG_HOST!,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE!,
  },
} satisfies Config
