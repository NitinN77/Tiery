import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { Row } from "@/types/tierlist"
import Image from "next/image"
import { Input } from "../ui/input"
import { ArrowDown, ArrowUp, X } from "lucide-react"

interface Props {
  row: Row
  listId: string
  listType?: string
  internalScroll?: boolean
  isCombineEnabled?: boolean
  onLabelChange: (text: string) => void
  up: () => void
  down: () => void
  remove: () => void
}

export const AuthorList: React.FC<Props> = ({
  listId,
  listType,
  row,
  onLabelChange,
  up,
  down,
  remove,
}) => {
  const imageSize = 140
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(dropProvided) => (
        <div {...dropProvided.droppableProps}>
          <div
            style={{
              display: "flex",
              margin: 10,
              minHeight: imageSize,
              overflowY: "auto",
              overflowX: "hidden",
            }}
            className="bg-gray-200 dark:bg-indigo-950 items-center rounded-md"
            ref={dropProvided.innerRef}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="ml-1"
            >
              <div>
                {row.id !== "unranked" && (
                  <X
                    onClick={remove}
                    className="hover:bg-gray-300 p-1 w-8 h-8 rounded dark:hover:bg-indigo-900 cursor-pointer"
                  />
                )}
              </div>

              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                }}
                className="space-y-1"
              >
                {row.id !== "unranked" && (
                  <ArrowUp
                    onClick={up}
                    className="hover:bg-gray-300 p-1 w-8 h-8 rounded dark:hover:bg-indigo-900 cursor-pointer"
                  />
                )}
                {row.id === "unranked" ? (
                  <Input className="w-24" value="Unranked" readOnly />
                ) : (
                  <Input
                    value={row.label}
                    className="w-24"
                    onChange={(e) => onLabelChange(e.target.value)}
                  />
                )}

                {row.id !== "unranked" && (
                  <ArrowDown
                    onClick={down}
                    className="hover:bg-gray-300 p-1 w-8 h-8 rounded dark:hover:bg-indigo-900 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-9 grid-cols-2 content-center">
              {row.urls.map((url, index) => (
                <div key={url} style={{ maxHeight: imageSize }}>
                  <Draggable draggableId={url} index={index}>
                    {(dragProvided) => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <Image
                          alt={url}
                          width={imageSize - 20}
                          className="max-w-fit"
                          style={{ maxHeight: imageSize }}
                          height={imageSize}
                          src={url}
                        />
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
            </div>
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}
