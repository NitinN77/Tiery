import { fetchImagesInTemplate } from "@/lib/data/fetch-images-in-template"
import Image from "next/image"
import CreatelistButton from "./createlist-button"

export default async function Page({
  params,
}: {
  params: { templateId: string }
}) {
  const images = await fetchImagesInTemplate(decodeURI(params.templateId))
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl font-bold">{decodeURI(params.templateId)}</p>
        <CreatelistButton />
      </div>

      <br />
      <div className="grid md:grid-cols-6 grid-cols-3 gap-4">
        {images?.map((image) => (
          <Image key={image} src={image} alt={image} width={200} height={200} />
        ))}
      </div>
    </div>
  )
}
