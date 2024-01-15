import { db } from "@/database/db"
import { templates } from "@/database/schema"

export async function fetchAllTemplates() {
  const fetchedTemplates = await db.select().from(templates)
  return fetchedTemplates
}
