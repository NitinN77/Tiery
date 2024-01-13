import TierList from "@/components/tier-list/TierList"
import { fetchImagesInTemplate } from "@/lib/data/fetch-images-in-template"

export default async function Page({
  params,
}: {
  params: { templateId: string }
}) {
  const images = await fetchImagesInTemplate(decodeURI(params.templateId))
  return <div>{images && <TierList images={images} />}</div>
}
