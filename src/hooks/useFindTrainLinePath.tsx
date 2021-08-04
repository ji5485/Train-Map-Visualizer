import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import { useGetTrainPlatform } from 'state/Train/trainPlatformState'
import { useGetTrainLine } from 'state/Train/trainLineState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import { TrainLineType, TrainPlatformType } from 'types/Train.types'
import { CoordinatePositionType } from 'types/CoordinateSystem.types'

type useFindTrainLinePathType = {
  findConnectedPlatformWithSelectedLine: (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => TrainPlatformType[]
  findLineWithSelectedLine: (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => void
}

export default function useFindTrainLinePath(): useFindTrainLinePathType {
  const trainPlatformMatrix = useGetTrainPlatform()
  const trainLineMatrix = useGetTrainLine()
  const { width, height } = useGetCoordinatePlaneSize()
  const { getPositionByNodeNumber } = useGetPositionByNodeNumber()

  const getNextNodeNumber = (nodeNumber: number) => [
    nodeNumber - width,
    nodeNumber + 1,
    nodeNumber + width,
    nodeNumber - 1,
  ]

  const findPathWithBFS = (
    startNodeNumber: number,
    selectedLineId: string,
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
        )
          queue.push(nextNodeNumber)
      })
    }

    return result
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

  const findLineWithSelectedLine = (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => {
    const [firstPosition, secondPosition] = findPathWithBFS(
      nodeNumber,
      selectedLine.lineId,
    )
    const trainPlatforms = [
      trainPlatformMatrix[firstPosition.row][firstPosition.column],
      trainPlatformMatrix[secondPosition.row][secondPosition.column],
    ]

    console.log(trainPlatforms)
    return trainPlatforms
  }

  return { findConnectedPlatformWithSelectedLine, findLineWithSelectedLine }
}