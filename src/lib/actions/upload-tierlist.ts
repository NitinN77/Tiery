"use server"

import { db } from "@/database/db"
import { templates, tierlists } from "@/database/schema"
import { Row } from "@/types/tierlist"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getUser } from "../server-utils"
import { redirect } from "next/navigation"
import crypto from "crypto"

export async function uploadTierlist(
  rows: Row[],
  templateName: string,
  formData: FormData
) {
  const user = await getUser({ queryUserFromDB: true })

  const template = await db
    .select()
    .from(templates)
    .where(eq(templates.name, templateName.replaceAll("%20", " ")))

  const tierlistName =
    (formData.get("tierlistName") as string) ||
    `${templateName.replaceAll("%20", " ")}_${crypto
      .randomBytes(2)
      .toString("hex")}`

  await db.insert(tierlists).values({
    templateId: template[0].id,
    data: rows,
    userId: user.user?.id,
    name: tierlistName,
  })

  revalidatePath("/tierlists")
  redirect("/tierlists")
}
