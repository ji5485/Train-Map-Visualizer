import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import { useGetTrainPlatform } from 'state/Train/trainPlatformState'
import { useGetTrainLine } from 'state/Train/trainLineState'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'
import { TrainLineType } from 'types/Train.types'
import { CoordinatePositionType } from 'types/CoordinateSystem.types'

type useFindTrainLinePathType = {
  findConnectedLine: (nodeNumber: number, selectedLine: TrainLineType) => void
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

  const findPathWithBFS = (startNodeNumber: number, selectedLineId: string) => {
    const result: CoordinatePositionType[] = []
    const queue = []
    const visited = new Array<boolean[]>(height).fill(
      new Array<boolean>(width).fill(false),
    )

    const startPosition = getPositionByNodeNumber(startNodeNumber)
    queue.push(startNodeNumber)
    visited[startPosition.row][startPosition.column] = true

    while (queue.length !== 0) {
      const currentNodeNumber = queue.shift()
      if (currentNodeNumber === undefined) return

      getNextNodeNumber(currentNodeNumber).forEach(nextNodeNumber => {
        if (nextNodeNumber < 0 || nextNodeNumber >= width * height - 1) return

        console.log(nextNodeNumber)

        const { row, column } = getPositionByNodeNumber(nextNodeNumber)
        const trainLine = trainLineMatrix[currentNodeNumber][nextNodeNumber]

        if (
          trainLine &&
          trainLine.lineId === selectedLineId &&
          !visited[row][column]
        ) {
          queue.push(nextNodeNumber)
          // visited[row][column] = true

          if (trainPlatformMatrix[row][column])
            result.push({ row, column } as CoordinatePositionType)
        }
      })
    }
    // return result
  }

  const findConnectedLine = (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => {
    findPathWithBFS(nodeNumber, selectedLine.lineId)

    // console.log(result)
  }

  return { findConnectedLine }
}
