"use server"

import "dotenv/config"
import crypto from "crypto"
import { getS3Client, getUser } from "../server-utils"
import z from "zod"
import { revalidatePath } from "next/cache"
import { db } from "@/database/db"
import { templates } from "@/database/schema"

const uploadImagesRequest = z.object({
  pictures: z.instanceof(File).array(),
  templateName: z
    .string()
    .min(1, "Template Name must be between 1 and 60 characters long")
    .max(60, "Template Name must be between 1 and 60 characters long"),
})

export type State = {
  errors?: {
    templateName?: string[]
    pictures?: string[]
  }
  message?: string | null
}

export async function uploadImages(
  prevState: State,
  formData: FormData
): Promise<State> {
  const { user } = await getUser({ queryUserFromDB: true })
  if (!user) {
    throw Error("User not found")
  }
  const parsedInput = uploadImagesRequest.safeParse({
    pictures: formData.getAll("pictures"),
    templateName: formData.get("templateName"),
  })

  if (!parsedInput.success) {
    return {
      errors: parsedInput.error.flatten().fieldErrors,
      message: "Invalid form input",
    }
  }

  const pictures = parsedInput.data.pictures

  if (pictures.length === 1 && !pictures[0].size) {
    return {
      errors: { pictures: ["No pictures were selected for upload"] },
    }
  }

  await db.insert(templates).values({
    name: parsedInput.data.templateName,
    userId: user.id,
  })

  const s3 = getS3Client()

  await Promise.all(
    pictures.map(async (picture) => {
      const binaryString = await picture.arrayBuffer()
      const buffer = Buffer.from(binaryString)

      const fileName = `${crypto.randomBytes(4).toString("hex")}_${
        picture.name
      }`

      s3.putObject(
        {
          Body: buffer,
          Bucket: process.env.BUCKET_NAME,
          Key: `${user.id}/${parsedInput.data.templateName}/${fileName}`,
        },
        (err) => {
          if (err) {
            return { message: "Error uploading image" }
          }
        }
      )
    })
  )

  revalidatePath("/templates")

  return { message: "Uploaded images" }
}
