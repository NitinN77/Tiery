import "dotenv/config"
import { getS3Client, getUser } from "../server-utils"
import { ListObjectsV2Output } from "@aws-sdk/client-s3"

// TODO: query from db instead of s3
export async function fetchTemplatesOfUser() {
  const { user } = await getUser({ queryUserFromDB: true })
  if (!user) {
    throw Error("Authentication Error")
  }
  const s3 = getS3Client()

  const data: ListObjectsV2Output = await s3.listObjectsV2({
    Bucket: process.env.BUCKET_NAME,
    Prefix: `${user.id}/`,
    Delimiter: "/",
  })

  const folderNames = data.CommonPrefixes?.map((prefix) =>
    (prefix.Prefix || "").replace(`${user.id}/`, "").replace("/", "")
  )
  return { templateNames: folderNames, userId: user.id }
}
