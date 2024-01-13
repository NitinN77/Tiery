import { Row } from "@/types/tierlist"
import Image from "next/image"

type PageProps = {
  rows: Row[]
}

const FrozenList = ({ rows }: PageProps) => {
  return (
    <div>
      {rows.map((row, i) => (
        <FrozenListRow key={row.id} row={row} />
      ))}
    </div>
  )
}

const FrozenListRow = ({ row }: { row: Row }) => {
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            backgroundColor: "pink",
            margin: 20,
            minHeight: 100,
            maxHeight: 120,
            overflowX: "auto",
          }}
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
              }}
            >
              <input style={{ fontSize: 18 }} readOnly value={row.label} />
            </div>
          </div>

          {row.urls.map((url) => (
            <Image src={url} key={url} height={60} width={100} alt={url} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FrozenList
