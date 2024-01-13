import "dotenv/config"
import { getS3Client, getUser } from "../server-utils"
import { GetObjectCommand, ListObjectsV2Output } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function fetchImagesInTemplate(templateName: string) {
  const { user } = await getUser({ queryUserFromDB: true })
  if (!user) {
    throw Error("Authentication Error")
  }
  const s3 = getS3Client()

  const data: ListObjectsV2Output = await s3.listObjectsV2({
    Bucket: process.env.BUCKET_NAME,
    Prefix: `${user.id}/${templateName}/`,
  })

  if (data.Contents) {
    const images = await Promise.all(
      data.Contents.map(async (image) => {
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: image.Key,
        })
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })
        return signedUrl
      })
    )

    return images
  }
}
