"use client"
import { DragDropContext } from "react-beautiful-dnd"
import { reorderRows, reorder } from "./reorder"
import { Row } from "@/types/tierlist"
import { AuthorList } from "./AuthorList"
import { randomBytes } from "crypto"
import { useState } from "react"
import { Button } from "../ui/button"
import { uploadTierlist } from "@/lib/actions/upload-tierlist"
import { Input } from "../ui/input"

type PageProps = {
  images: string[]
  templateName: string
}

const TierList = ({ images, templateName }: PageProps) => {
  const [rows, setRows] = useState<Row[]>([
    { id: randomBytes(10).toString("hex"), label: "S", urls: [] },
    { id: randomBytes(10).toString("hex"), label: "A", urls: [] },
    { id: randomBytes(10).toString("hex"), label: "B", urls: [] },
    { id: randomBytes(10).toString("hex"), label: "C", urls: [] },
    { id: randomBytes(10).toString("hex"), label: "F", urls: [] },
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
        if (!destination) {
          return
        }

        setRows(reorderRows(rows, source, destination))
      }}
    >
      <div>
        <form action={uploadTierlistWrapper}>
          <div className="flex justify-between mx-3 md:mt-0 mt-3 space-x-2">
            <div className="flex space-x-4 md:w-3/6 w-full">
              <Button
                className="whitespace-nowrap"
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
              <Input
                placeholder="Give a name to your tierlist"
                name="tierlistName"
                id="tierlistName"
              />
            </div>
            <Button>Save</Button>
          </div>
        </form>
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
