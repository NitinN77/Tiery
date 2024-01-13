CREATE TABLE IF NOT EXISTS "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tierlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"templateId" integer,
	"data" jsonb
);
