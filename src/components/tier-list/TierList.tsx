"use client"
import { DragDropContext } from "react-beautiful-dnd"
import { reorderRows, reorder } from "./reorder"
import { Row } from "@/types/tierlist"
import { AuthorList } from "./AuthorList"
import { randomBytes } from "crypto"
import { useState } from "react"
import { Button } from "../ui/button"
import { uploadTierlist } from "@/lib/actions/upload-tierlist"

type PageProps = {
  images: string[]
  templateName: string
}

const TierList = ({ images, templateName }: PageProps) => {
  const [rows, setRows] = useState<Row[]>([
    { id: randomBytes(10).toString("hex"), label: "a", urls: [] },
    {
      id: "unranked",
      label: "unranked",
      urls: images,
    },
  ])

  const uploadTierlistWrapper = uploadTierlist.bind(null, rows, templateName)

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
        <div className="flex justify-between">
          <Button
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
            Add Row
          </Button>
          <form action={uploadTierlistWrapper}>
            <Button>Save</Button>
          </form>
        </div>
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
