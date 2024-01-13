import { DraggableLocation } from "react-beautiful-dnd"
import { Row } from "@/types/tierlist"

export const reorder = (
  list: any[],
  startIndex: number,
  endIndex: number
): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const reorderRows = (
  rows: Row[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const current = rows.find((x) => x.id === source.droppableId)!
  const next = rows.find((x) => x.id === destination.droppableId)!
  const target = current.urls[source.index]

  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current.urls, source.index, destination.index)
    return rows.map((x) =>
      x.id === source.droppableId
        ? {
            ...x,
            urls: reordered,
          }
        : x
    )
  }

  current.urls.splice(source.index, 1)
  next.urls.splice(destination.index, 0, target)

  return rows.map((x) => {
    if (x.id === source.droppableId) {
      return {
        ...x,
        urls: current.urls,
      }
    } else if (x.id === destination.droppableId) {
      return {
        ...x,
        urls: next.urls,
      }
    }

    return x
  })
}
