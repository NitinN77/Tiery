import { auth } from "@/auth"
import CreateTemplate from "./create-template"

export default async function Page() {
  const session = await auth()
  if (!session) {
    throw Error("Authentication Error")
  }
  return <CreateTemplate />
}
