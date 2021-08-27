import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from 'state/Train/TrainMapState'
import { useManageTrainMapGraph } from 'state/Train/TrainMapGraphState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import {
  TrainLineType,
  TrainPlatformType,
  TrainMapGraphType,
  TrainMapGraphEdgeType,
} from 'types/Train.types'
import { CoordinatePositionType } from 'types/CoordinateSystem.types'
import PriorityQueue from 'utils/priorityQueue'
import produce from 'immer'

type AdjacencyListNodeType = {
  next: number
  graph: TrainMapGraphEdgeType
}

const convertToAdjacencyList = (
  graph: TrainMapGraphType,
  width: number,
  height: number,
) => {
  const maxNodeNumber = width * height - 1
  const adjacencyList = Array.from(
    Array<AdjacencyListNodeType[]>(maxNodeNumber + 1),
    () => Array<AdjacencyListNodeType>(),
  )

  for (let i = 0; i <= maxNodeNumber; i++) {
    for (let j = i + 1; j <= maxNodeNumber; j++) {
      if (graph[i][j] === null) continue

      adjacencyList[i].push({
        next: j,
        graph: graph[i][j] as TrainMapGraphEdgeType,
      })
      adjacencyList[j].push({
        next: i,
        graph: graph[i][j] as TrainMapGraphEdgeType,
      })
    }
  }

  return adjacencyList
}

type useFindTrainLinePathType = {
  findConnectedPlatformWithSelectedLine: (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => TrainPlatformType[]
  findLineWithSelectedPlatforms: (
    startNodeNumber: number,
    destinationNodeNumber: number,
  ) => void
  removeLineWithSelectedLine: (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => void
}

export default function useFindTrainLinePath(): useFindTrainLinePathType {
  const { trainPlatformMatrix } = useManageTrainPlatform()
  const { trainLineMatrix, setTrainLineMatrix } = useManageTrainLine()
  const { trainMapGraph } = useManageTrainMapGraph()
  const { width, height } = useGetCoordinatePlaneSize()
  const {
    getPositionByNodeNumber,
    getNodeNumberByPosition,
  } = useGetPositionByNodeNumber()

  const getNextNodeNumber = (nodeNumber: number) => [
    nodeNumber - width,
    nodeNumber + 1,
    nodeNumber + width,
    nodeNumber - 1,
  ]

  const findPathWithBFS = (
    startNodeNumber: number,
    selectedLineId: string,
    callback?: (currentNodeNumber: number, nextNodeNumber: number) => void,
  ): CoordinatePositionType[] => {
    const result: CoordinatePositionType[] = []
    const queue = [startNodeNumber]
    const visited = Array.from(Array<boolean[]>(height), () =>
      Array<boolean>(width).fill(false),
    )

    while (queue.length !== 0) {
      const currentNodeNumber = queue.shift()
      if (currentNodeNumber === undefined) break

      const { row, column } = getPositionByNodeNumber(currentNodeNumber)
      visited[row][column] = true
      if (trainPlatformMatrix[row][column])
        result.push({ row, column } as CoordinatePositionType)

      getNextNodeNumber(currentNodeNumber).forEach(nextNodeNumber => {
        if (nextNodeNumber < 0 || nextNodeNumber >= width * height - 1) return

        const nextPosition = getPositionByNodeNumber(nextNodeNumber)
        const trainLine = trainLineMatrix[currentNodeNumber][nextNodeNumber]

        if (
          trainLine &&
          trainLine.lineId === selectedLineId &&
          !visited[nextPosition.row][nextPosition.column]
        ) {
          queue.push(nextNodeNumber)

          if (callback !== undefined)
            callback(currentNodeNumber, nextNodeNumber)
        }
      })
    }

    return result
  }

  const findPathWithDijkstra = (startNodeNumber: number) => {
    // Convert Train Platform Information From Adjacency Matrix to Adjacency List
    const trainMapAdjacencyList = convertToAdjacencyList(
      trainMapGraph,
      width,
      height,
    )

    // TODO: Developing Dijkstra Algorithm
    const shortestTime = new Array(getNodeNumberByPosition(width, height))
    const visited = Array.from(Array<boolean[]>(height), () =>
      Array<boolean>(width).fill(false),
    )
    const priorityQueue = new PriorityQueue<number>(0, startNodeNumber)

    shortestTime[startNodeNumber] = 0
    visited[startNodeNumber] = true
    priorityQueue.enqueue(0, startNodeNumber)

    while (!priorityQueue.isEmpty()) {
      const currentNodeNumber = priorityQueue.dequeue()
      console.log(currentNodeNumber)

      if (visited[currentNodeNumber]) continue
      else visited[currentNodeNumber] = true

      for (const { next, graph } of trainMapAdjacencyList[currentNodeNumber]) {
        if (shortestTime[next] <= shortestTime[currentNodeNumber] + graph.time)
          continue

        shortestTime[next] = shortestTime[currentNodeNumber] + graph.time
        priorityQueue.enqueue(graph.time, next)
      }
    }
    // TODO: Developing Tracing Shortest Path
  }

  const findConnectedPlatformWithSelectedLine = (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ): TrainPlatformType[] => {
    const [firstPosition, secondPosition] = findPathWithBFS(
      nodeNumber,
      selectedLine.lineId,
    )
    const trainPlatforms = [
      trainPlatformMatrix[firstPosition.row][
        firstPosition.column
      ] as TrainPlatformType,
      trainPlatformMatrix[secondPosition.row][
        secondPosition.column
      ] as TrainPlatformType,
    ]

    return trainPlatforms
  }

  const findLineWithSelectedPlatforms = (
    startNodeNumber: number,
    destinationNodeNumber: number,
  ) => {
    findPathWithDijkstra()

    console.log(startNodeNumber, destinationNodeNumber)
  }

  const removeLineWithSelectedLine = (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => {
    const removeTrainLine = (
      currentNodeNumber: number,
      nextNodeNumber: number,
    ) =>
      setTrainLineMatrix(prev =>
        produce(prev, draft => {
          draft[currentNodeNumber][nextNodeNumber] = draft[nextNodeNumber][
            currentNodeNumber
          ] = null
          return draft
        }),
      )

    findPathWithBFS(nodeNumber, selectedLine.lineId, removeTrainLine)
  }

  return {
    findConnectedPlatformWithSelectedLine,
    findLineWithSelectedPlatforms,
    removeLineWithSelectedLine,
  }
}
