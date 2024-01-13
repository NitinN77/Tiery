import { auth } from "@/auth"
import CreateAlbum from "./create-album"

export default async function Page() {
  const session = await auth()
  if (!session) {
    throw Error("Authentication Error")
  }
  return <CreateAlbum />
}
