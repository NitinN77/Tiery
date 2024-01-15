"use client"

import { deleteTemplate } from "@/lib/actions/delete-template"
import { Trash2 } from "lucide-react"

type ComponentProps = {
  userId: string
  templateName: string
}

export default function DeleteTemplateButton({
  userId,
  templateName,
}: ComponentProps) {
  const deleteTemplateWrapper = deleteTemplate.bind(null, userId, templateName)

  return (
    <Trash2
      className="hover:bg-gray-300 p-1 w-8 h-8 rounded dark:hover:bg-indigo-900 cursor-pointer"
      onClick={async () => {
        await deleteTemplateWrapper()
      }}
    />
  )
}
