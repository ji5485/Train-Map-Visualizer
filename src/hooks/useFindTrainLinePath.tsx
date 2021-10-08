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
  TrainPathResultType,
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
  ) => TrainPathResultType
  removeLineWithSelectedLine: (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => number
}

export default function useFindTrainLinePath(): useFindTrainLinePathType {
  const { trainPlatformMatrix } = useManageTrainPlatform()
  const { trainLineMatrix, setTrainLineMatrix } = useManageTrainLine()
  const { trainMapGraph } = useManageTrainMapGraph()
  const { width, height } = useGetCoordinatePlaneSize()
  const { getPositionByNodeNumber, getNodeNumberByPosition } =
    useGetPositionByNodeNumber()

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
        if (nextNodeNumber < 0 || nextNodeNumber >= width * height) return

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
  ): TrainPathResultType => {
    const tracedNodeNumberList = findPathWithDijkstra(
      startNodeNumber,
      destinationNodeNumber,
    )

    const sections = tracedNodeNumberList.reduce<TrainPathSectionType[]>(
      (list, nodeNumber, index) => {
        const nextNodeNumberInLine = getNextNodeNumber(nodeNumber).filter(
          nextNodeNumber => {
            if (
              nextNodeNumber < 0 ||
              nextNodeNumber >= width * height ||
              index >= tracedNodeNumberList.length - 1
            )
              return false

            const trainLine = trainLineMatrix[nodeNumber][nextNodeNumber]
            const trainLineGraphEdge =
              trainMapGraph[nodeNumber][tracedNodeNumberList[index + 1]]

            if (trainLine === null || trainLineGraphEdge === null) return false

            return trainLine.lineId === trainLineGraphEdge.id
          },
        )

        const lastSection = list[list.length - 1]
        const lastSectionTime =
          index !== 0
            ? trainMapGraph[tracedNodeNumberList[index - 1]][
                tracedNodeNumberList[index]
              ]!.time
            : 0
        const nextTrainLine =
          index !== tracedNodeNumberList.length - 1
            ? trainLineMatrix[nodeNumber][nextNodeNumberInLine[0]]!
            : null
        const { row, column } = getPositionByNodeNumber(nodeNumber)

        const createNewSection = (): void => {
          if (nextNodeNumberInLine.length !== 1)
            throw new Error('Cannot Create New Section')

          const firstSection: TrainPathSectionType = {
            start: trainPlatformMatrix[row][column]!,
            destination: null,
            line: trainLineMatrix[nodeNumber][nextNodeNumberInLine[0]]!.color,
            time: 0,
            pass: [trainMapGraph[nodeNumber][tracedNodeNumberList[index + 1]]!],
          }

          list.push(firstSection)
        }

        const completeSection = (): void => {
          list.splice(list.length - 1, 1, {
            ...lastSection,
            destination: trainPlatformMatrix[row][column],
            time: lastSection.time + lastSectionTime,
          })
        }

        if (index === 0) createNewSection()
        else if (index === tracedNodeNumberList.length - 1) completeSection()
        else if (
          nextTrainLine !== null &&
          lastSection.line !== nextTrainLine.color
        ) {
          completeSection()
          createNewSection()
        } else {
          lastSection.time += lastSectionTime
          lastSection.pass = [
            ...lastSection.pass,
            trainMapGraph[nodeNumber][tracedNodeNumberList[index + 1]]!,
          ]
        }

        return list
      },
      [],
    )

    return { platforms: tracedNodeNumberList, sections }
  }

  const removeLineWithSelectedLine = (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ): number => {
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

    const routes = findPathWithBFS(
      nodeNumber,
      selectedLine.lineId,
      removeTrainLine,
    )
    const { row, column } = routes[routes.length - 1]

    return getNodeNumberByPosition(row, column)
  }

  return {
    findConnectedPlatformWithSelectedLine,
    findLineWithSelectedPlatforms,
    removeLineWithSelectedLine,
  }
}
