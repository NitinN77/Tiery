"use server"

import { db } from "@/database/db"
import { templates, tierlists } from "@/database/schema"
import { Row } from "@/types/tierlist"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function uploadTierlist(
  rows: Row[],
  templateName: string,
  formData: FormData
) {
  const template = await db
    .select()
    .from(templates)
    .where(eq(templates.name, templateName.replaceAll("%20", " ")))

  await db.insert(tierlists).values({ templateId: template[0].id, data: rows })

  revalidatePath("/tierlists")
  return { message: "Uploaded tierlist" }
}
