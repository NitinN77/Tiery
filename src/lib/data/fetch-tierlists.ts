import { db } from "@/database/db"

export async function fetchTierlists() {
  const fetchedTierlists = await db.query.tierlists.findMany({
    with: {
      creator: true,
      template: true,
    },
  })
  return fetchedTierlists
}
