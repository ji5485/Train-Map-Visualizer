import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import { useGetTrainPlatform } from 'state/Train/trainPlatformState'
import { useGetTrainLine } from 'state/Train/trainLineState'
import { TrainLineType } from 'types/Train.types'
import findTrainLineWithBFS from 'utils/bfs'

type useFindTrainLinePathType = {
  findConnectedLine: (nodeNumber: number, selectedLine: TrainLineType) => void
}

export default function useFindTrainLinePath(): useFindTrainLinePathType {
  const trainPlatformMatrix = useGetTrainPlatform()
  const trainLineMatrix = useGetTrainLine()
  const { getPositionByNodeNumber } = useGetPositionByNodeNumber()

  const findConnectedLine = (
    nodeNumber: number,
    selectedLine: TrainLineType,
  ) => {
    const { row, column } = getPositionByNodeNumber(nodeNumber)

    const result = findTrainLineWithBFS(
      trainPlatformMatrix,
      trainLineMatrix,
      row,
      column,
    )
  }

  return { findConnectedLine }
}
