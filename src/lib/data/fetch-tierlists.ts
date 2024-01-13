import { db } from "@/database/db"
import { tierlists } from "@/database/schema"

export async function fetchTierlists() {
  const fetchedTierlists = await db.select().from(tierlists)
  return fetchedTierlists
}
