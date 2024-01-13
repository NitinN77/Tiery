import { Button } from "@/components/ui/button"
import { AlbumList } from "@/components/album-list"
import Link from "next/link"

export default function IndexPage() {
  return (
    <section className="grid items-center gap-6">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold">My Albums</h1>
        <Link href={`/create`}>
          <Button>Create Album</Button>
        </Link>
      </div>
      <AlbumList />
    </section>
  )
}
