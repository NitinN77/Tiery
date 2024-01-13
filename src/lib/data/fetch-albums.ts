import "dotenv/config"
import { getS3Client, getUser } from "../server-utils"
import { ListObjectsV2Output } from "@aws-sdk/client-s3"

export async function fetchAlbumsFromS3() {
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
  return { albumNames: folderNames, userId: user.id }
}
