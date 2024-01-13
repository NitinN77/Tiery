import { fetchTemplatesFromS3 } from "@/lib/data/fetch-templates"
import { Card, CardHeader } from "./ui/card"
import Link from "next/link"

export async function TemplateList() {
  const { templateNames, userId } = await fetchTemplatesFromS3()
  return (
    <div className="grid sm:grid-cols-4 gap-4 grid-cols-1">
      {templateNames?.map((templateName) => (
        <Link href={`/templates/${userId}/${templateName}`} key={templateName}>
          <Card>
            <CardHeader>{templateName}</CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
