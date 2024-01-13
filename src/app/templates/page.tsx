import { Button } from "@/components/ui/button"
import { TemplateList } from "@/components/template-list"
import Link from "next/link"

export default function Page() {
  return (
    <section className="grid items-center gap-6">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold">My Templates</h1>
        <Link href={`/create`}>
          <Button>Create Template</Button>
        </Link>
      </div>
      <TemplateList />
    </section>
  )
}
