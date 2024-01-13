import { Card, CardContent } from "@/components/ui/card"
import { fetchImagesInTemplate } from "@/lib/data/fetch-images-in-template"
import Image from "next/image"

export default async function Page({
  params,
}: {
  params: { templateId: string }
}) {
  const images = await fetchImagesInTemplate(decodeURI(params.templateId))
  return (
    <div>
      <p className="text-2xl font-bold">{decodeURI(params.templateId)}</p>
      <br />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {images?.map((image) => (
          <Image key={image} src={image} alt={image} width={700} height={700} />
        ))}
      </div>
    </div>
  )
}
