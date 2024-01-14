import FrozenList from "@/components/tier-list/FrozenList"
import { fetchTierlists } from "@/lib/data/fetch-tierlists"
import { Row } from "@/types/tierlist"

export default async function Page() {
  const tierlists = await fetchTierlists()
  return (
    <div className="flex flex-col space-y-9">
      {tierlists.map((tierlist) => (
        <FrozenList
          key={tierlist.id}
          rows={tierlist.data as Row[]}
          creator={tierlist.creator!.name!}
          creatorId={tierlist.creator!.id}
        />
      ))}
    </div>
  )
}
