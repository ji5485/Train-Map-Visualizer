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
} from 'types/Train.types'
import { CoordinatePositionType } from 'types/CoordinateSystem.types'
import {
  AdjacencyListNodeType,
  TrainPathSectionType,
} from 'types/TrainPath.types'
import PriorityQueue from 'utils/priorityQueue'
import produce from 'immer'

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
      const weight = graph[i][j]?.time

      if (weight === undefined) continue

      adjacencyList[i].push({ node: j, weight })
      adjacencyList[j].push({ node: i, weight })
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

  const findPathWithDijkstra = (
    startNodeNumber: number,
    destinationNodeNumber: number,
  ): number[] => {
    const trainMapAdjacencyList = convertToAdjacencyList(
      trainMapGraph,
      width,
      height,
    )

    const nodeCount = getNodeNumberByPosition(width, height)
    const timeTable = new Array<number>(nodeCount).fill(Number.MAX_SAFE_INTEGER)
    const visitedHistory = new Array<number>(nodeCount)
    const priorityQueue = new PriorityQueue()

    timeTable[startNodeNumber] = 0
    priorityQueue.enqueue(0, startNodeNumber)

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue()
      if (currentNode === undefined) break

      const { weight, node: currentNodeNumber } = currentNode

      if (timeTable[currentNodeNumber] < weight) continue

      trainMapAdjacencyList[currentNodeNumber].forEach(
        (nextNode: AdjacencyListNodeType) => {
          const sumOfWeight = weight + nextNode.weight

          if (timeTable[nextNode.node] <= sumOfWeight) return

          timeTable[nextNode.node] = sumOfWeight
          priorityQueue.enqueue(sumOfWeight, nextNode.node)
          visitedHistory[nextNode.node] = currentNodeNumber
        },
      )
    }

    if (timeTable[destinationNodeNumber] === Number.MAX_SAFE_INTEGER) return []

    const tracedNodeNumberList = (function tracePath(
      nodeNumber: number,
    ): number[] {
      if (nodeNumber === startNodeNumber) return [nodeNumber]
      return [...tracePath(visitedHistory[nodeNumber]), nodeNumber]
    })(destinationNodeNumber)

    return tracedNodeNumberList
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
    const tracedNodeNumberList = findPathWithDijkstra(
      startNodeNumber,
      destinationNodeNumber,
    )

    const result = tracedNodeNumberList.reduce<TrainPathSectionType[]>(
      (list, nodeNumber, index) => {
        const nextNodeNumberInLine = getNextNodeNumber(nodeNumber).filter(
          nextNodeNumber => {
            if (
              nextNodeNumber < 0 ||
              nextNodeNumber >= width * height - 1 ||
              index >= tracedNodeNumberList.length
            )
              return false

            const trainLine = trainLineMatrix[nodeNumber][nextNodeNumber]
            const trainLineGraphEdge =
              trainMapGraph[nodeNumber][tracedNodeNumberList[index + 1]]

            if (trainLine === null || trainLineGraphEdge === null) return false

            return trainLine.lineId === trainLineGraphEdge.id
          },
        )

        if (index === 0) {
          const { row, column } = getPositionByNodeNumber(nodeNumber)
          const start = trainPlatformMatrix[row][column]

          if (start === null || nextNodeNumberInLine.length !== 1)
            throw new Error('abc')

          const firstSection: TrainPathSectionType = {
            start,
            destination: null,
            line: trainLineMatrix[nodeNumber][nextNodeNumberInLine[0]]!,
            time: 0,
          }

          return [firstSection]
        } else if (index === tracedNodeNumberList.length - 1) {
          const lastSection = list[list.length - 1]
          const lastSectionTime = trainMapGraph[
            tracedNodeNumberList[index - 1]
          ][tracedNodeNumberList[index]]!.time
          const { row, column } = getPositionByNodeNumber(nodeNumber)

          list.splice(list.length - 1, 1, {
            ...lastSection,
            destination: trainPlatformMatrix[row][column],
            time: lastSection.time + lastSectionTime,
          })

          return list
        }

        // TODO: Check whether Prev Train Line Item Equals Next Train Line Item With nextNodeNumberInLine Variable

        return list
      },
      [],
    )

    console.log(result)
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
