import TierList from "@/components/tier-list/TierList"
import { fetchImagesInTemplate } from "@/lib/data/fetch-images-in-template"

export default async function Page({
  params,
}: {
  params: { templateName: string }
}) {
  const images = await fetchImagesInTemplate(decodeURI(params.templateName))
  return (
    <div>
      {/* {images && (
        <TierList images={images} templateName={params.templateName} />
      )} */}
    </div>
  )
}
