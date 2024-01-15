import { fetchImagesInTemplate } from "@/lib/data/fetch-images-in-template"
import Image from "next/image"
import CreatelistButton from "./createlist-button"
import { Trash2 } from "lucide-react"
import { getUser } from "@/lib/server-utils"
import DeleteTemplateButton from "./delete-template-button"

export default async function Page({
  params,
}: {
  params: { templateName: string; userId: string }
}) {
  const user = await getUser({ queryUserFromDB: true })
  const images = await fetchImagesInTemplate(
    decodeURI(params.templateName),
    params.userId
  )

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <p className="text-2xl font-bold">{decodeURI(params.templateName)}</p>
          {user.user?.id === params.userId && (
            <DeleteTemplateButton
              userId={params.userId}
              templateName={params.templateName}
            />
          )}
        </div>
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
