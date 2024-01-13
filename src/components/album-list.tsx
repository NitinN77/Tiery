import { fetchAlbumsFromS3 } from "@/lib/data/fetch-albums"
import { Card, CardHeader } from "./ui/card"
import Link from "next/link"

export async function AlbumList() {
  const { albumNames, userId } = await fetchAlbumsFromS3()
  return (
    <div className="grid sm:grid-cols-4 gap-4 grid-cols-1">
      {albumNames?.map((albumName) => (
        <Link href={`/albums/${userId}/${albumName}`} key={albumName}>
          <Card>
            <CardHeader>{albumName}</CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
