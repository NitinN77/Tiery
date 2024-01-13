import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  jsonb,
} from "drizzle-orm/pg-core"
// @ts-ignore
import type { AdapterAccount } from "@auth/core/adapters"
import { InferSelectModel, relations } from "drizzle-orm"

// AUTH

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const usersRelations = relations(users, ({ many }) => ({
  templates: many(templates),
}))

export type userSelectSchema = InferSelectModel<typeof users>

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

// Template

export const templates = pgTable("templates", {
  id: serial("id").notNull().primaryKey(),
  userId: text("userId"),
  name: text("name"),
})

export const templatesRelations = relations(templates, ({ one, many }) => ({
  creator: one(users, {
    fields: [templates.userId],
    references: [users.id],
  }),
  tierlists: many(tierlists),
}))

// Tierlist

export const tierlists = pgTable("tierlists", {
  id: serial("id").notNull().primaryKey(),
  templateId: integer("templateId"),
  data: jsonb("data"),
})

export const tierlistsRelations = relations(tierlists, ({ one }) => ({
  template: one(templates, {
    fields: [tierlists.templateId],
    references: [templates.id],
  }),
}))
