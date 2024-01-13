import "dotenv/config"
import { db } from "@/database/db"
import { userSelectSchema, users } from "@/database/schema"
import { S3 } from "@aws-sdk/client-s3"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"
import { auth } from "@/auth"

type GetUserResponse = {
  error: string | null
  session: Session | null
  user: userSelectSchema | null
}

export async function getUser({
  queryUserFromDB = false,
}: {
  queryUserFromDB: boolean
}): Promise<GetUserResponse> {
  // @ts-ignore
  const session = await auth()

  if (!session) {
    return { error: "Not authenticated", session: null, user: null }
  }

  if (queryUserFromDB) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user?.email!))

    if (!user) {
      return { error: "User not found", session: null, user: null }
    }

    return { error: null, session: session, user: user[0] }
  } else {
    return { error: null, session: session, user: null }
  }
}

export function getS3Client() {
  return new S3({
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION!,
  })
}
