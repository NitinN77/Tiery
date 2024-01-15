"use client"

import { deleteTemplate } from "@/lib/actions/delete-template"
import { Trash2 } from "lucide-react"

export default function DeleteTemplateButton() {
  return (
    <Trash2
      className="hover:bg-gray-300 p-1 w-8 h-8 rounded dark:hover:bg-indigo-900 cursor-pointer"
      onClick={async () => {
        await deleteTemplate()
      }}
    />
  )
}
