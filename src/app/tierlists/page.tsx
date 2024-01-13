import FrozenList from "@/components/tier-list/FrozenList"
import { fetchTierlists } from "@/lib/data/fetch-tierlists"
import { Row } from "@/types/tierlist"

export default async function Page() {
  const tierlists = await fetchTierlists()
  return (
    <div>
      {tierlists.map((tierlist) => (
        <FrozenList key={tierlist.id} rows={tierlist.data as Row[]} />
      ))}
    </div>
  )
}
