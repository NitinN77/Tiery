"use server"

import "dotenv/config"
import crypto from "crypto"
import { getS3Client, getUser } from "../server-utils"
import z from "zod"
import { revalidatePath } from "next/cache"

const uploadImagesRequest = z.object({
  pictures: z.instanceof(File).array(),
  albumName: z
    .string()
    .min(1, "Album Name must be between 1 and 60 characters long")
    .max(60, "Album Name must be between 1 and 60 characters long"),
})

export type State = {
  errors?: {
    albumName?: string[]
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
    albumName: formData.get("albumName"),
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
          Key: `${user.id}/${parsedInput.data.albumName}/${fileName}`,
        },
        (err) => {
          if (err) {
            return { message: "Error uploading image" }
          }
        }
      )
    })
  )

  revalidatePath("/")

  return { message: "Uploaded images" }
}
