import "dotenv/config"
import { getS3Client, getUser } from "../server-utils"
import { ListObjectsV2Output } from "@aws-sdk/client-s3"

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
        return `${process.env.S3_ENDPOINT}/${process.env.BUCKET_NAME}/${image.Key}`
      })
    )

    return images
  }
}
