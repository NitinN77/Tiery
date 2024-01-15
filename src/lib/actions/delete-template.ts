"use server"
import "dotenv/config"
import { getS3Client } from "../server-utils"
import { ListObjectsV2Output } from "@aws-sdk/client-s3"
import { db } from "@/database/db"
import { templates, tierlists } from "@/database/schema"
import { and, eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export async function deleteTemplate(userId: string, templateName: string) {
  const s3 = getS3Client()

  const data: ListObjectsV2Output = await s3.listObjectsV2({
    Bucket: process.env.BUCKET_NAME,
    Prefix: `${userId}/${templateName}/`,
  })

  const toBeDeleted: { Key: string }[] = []

  data.Contents?.forEach((image) => {
    if (image.Key) {
      toBeDeleted.push({ Key: image.Key })
    }
  })

  s3.deleteObjects({
    Bucket: process.env.BUCKET_NAME!,
    Delete: {
      Objects: toBeDeleted,
    },
  })

  s3.deleteObject({
    Bucket: process.env.BUCKET_NAME!,
    Key: `${userId}/${templateName}/`,
  })

  const deletedTemplate = await db
    .delete(templates)
    .where(and(eq(templates.name, templateName), eq(templates.userId, userId)))
    .returning()

  await db
    .delete(tierlists)
    .where(eq(tierlists.templateId, deletedTemplate[0].id))

  redirect("/templates")
}
