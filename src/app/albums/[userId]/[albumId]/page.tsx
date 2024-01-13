import { Card, CardContent } from "@/components/ui/card"
import { fetchImagesInAlbum } from "@/lib/data/fetch-images-in-album"
import Image from "next/image"

export default async function Page({
  params,
}: {
  params: { albumId: string }
}) {
  const images = await fetchImagesInAlbum(decodeURI(params.albumId))
  return (
    <div>
      <p className="text-2xl font-bold">{decodeURI(params.albumId)}</p>
      <br />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {images?.map((image) => (
          <Image key={image} src={image} alt={image} width={700} height={700} />
        ))}
      </div>
    </div>
  )
}
