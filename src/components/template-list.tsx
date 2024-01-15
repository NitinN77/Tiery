import { Card, CardHeader } from "./ui/card"
import Link from "next/link"
import { fetchAllTemplates } from "@/lib/data/fetch-all-templates"

export async function TemplateList() {
  const templates = await fetchAllTemplates()
  return (
    <div className="grid sm:grid-cols-4 gap-4 grid-cols-1">
      {templates?.map((template) => (
        <Link
          href={`/templates/${template.userId}/${template.name}`}
          key={template.id}
        >
          <Card>
            <CardHeader>{template.name}</CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
