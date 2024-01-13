"use server"

import { db } from "@/database/db"
import { templates, tierlists } from "@/database/schema"
import { Row } from "@/types/tierlist"
import { eq } from "drizzle-orm"

export async function uploadTierlist(
  rows: Row[],
  templateName: string,
  formData: FormData
) {
  const template = await db
    .select()
    .from(templates)
    .where(eq(templates.name, templateName.replace("%20", " ")))

  await db.insert(tierlists).values({ templateId: template[0].id, data: rows })

  return { message: "Uploaded tierlist" }
}
