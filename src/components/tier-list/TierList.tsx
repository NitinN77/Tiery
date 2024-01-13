"use client"
import { DragDropContext } from "react-beautiful-dnd"
import { reorderRows, reorder } from "./reorder"
import { Row } from "@/types/tierlist"
import { AuthorList } from "./AuthorList"
import { randomBytes } from "crypto"
import { useState } from "react"

type PageProps = {
  images: string[]
}

const TierList = ({ images }: PageProps) => {
  const [rows, setRows] = useState<Row[]>([
    { id: randomBytes(10).toString("hex"), label: "a", urls: [] },
    {
      id: "unranked",
      label: "unranked",
      urls: images,
    },
  ])

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return
        }

        setRows(reorderRows(rows, source, destination))
      }}
    >
      <div>
        <button
          onClick={() => {
            setRows([
              {
                id: randomBytes(10).toString("hex"),
                label: "",
                urls: [],
              },
              ...rows,
            ])
          }}
        >
          add row
        </button>
        {rows.map((row, i) => (
          <AuthorList
            internalScroll
            key={row.id}
            listId={row.id}
            listType="CARD"
            row={row}
            onLabelChange={(text) => {
              setRows(
                rows.map((r) => (r.id === row.id ? { ...r, label: text } : r))
              )
            }}
            remove={() => {
              setRows(
                rows
                  .filter((x) => x.id !== row.id)
                  .map((x) =>
                    x.id === "unranked"
                      ? { ...x, urls: [...row.urls, ...x.urls] }
                      : x
                  )
              )
            }}
            up={() => {
              setRows(reorder(rows, i, i - 1))
            }}
            down={() => {
              setRows(reorder(rows, i, i + 1))
            }}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default TierList
