import { Row } from "@/types/tierlist"
import Image from "next/image"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"

type PageProps = {
  rows: Row[]
  creator: string
  creatorId: string
  templateName: string
}

const FrozenList = ({ rows, creator, creatorId, templateName }: PageProps) => {
  return (
    <div>
      <div className="flex justify-between content-center mx-3">
        <Link
          href={`${process.env.NEXTAUTH_URL}/templates/${creatorId}/${templateName}/createlist`}
        >
          <Button>Make your own version</Button>
        </Link>
        <div>by {creator}</div>
      </div>
      {rows.map((row, i) => (
        <FrozenListRow key={row.id} row={row} />
      ))}
    </div>
  )
}

const FrozenListRow = ({ row }: { row: Row }) => {
  const imageSize = 130
  return (
    <div
      style={{
        display: "flex",
        margin: 10,
        minHeight: imageSize,
        overflowY: "hidden",
      }}
      className="bg-gray-200 dark:bg-indigo-950 rounded-md"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <Input readOnly value={row.label} className="w-24" />
        </div>
      </div>
      <div className="grid md:grid-cols-9 grid-cols-2 content-center">
        {row.urls.map((url) => (
          <div key={url} style={{ maxHeight: imageSize }}>
            <Image src={url} height={imageSize} width={imageSize} alt={url} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FrozenList
