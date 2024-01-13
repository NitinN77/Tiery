"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function CreatelistButton() {
  const path = usePathname()
  return (
    <Link href={`${path}/createlist`}>
      <Button>Create Tierlist</Button>
    </Link>
  )
}
