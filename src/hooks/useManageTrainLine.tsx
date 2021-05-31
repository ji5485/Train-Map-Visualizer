import shortId from 'utils/shortId'
import { TrainLineType, useStateTrainLine } from 'state/train/trainLineState'
import { TrainLineColorName } from 'state/train/trainLineColorState'

type useManageTrainLineType = {
  createTrainLine: (name: string, color: TrainLineColorName) => TrainLineType
  removeTrainLine: (removeId: string) => void
  getTrainLineById: (selectedId: string) => TrainLineType | undefined
}

export default function useManageTrainLine(): useManageTrainLineType {
  const [trainLine, setTrainLine] = useStateTrainLine()

  const createTrainLine = (
    name: string,
    color: TrainLineColorName,
  ): TrainLineType => {
    const newTrainLine = {
      id: shortId(),
      name,
      color,
    }

    setTrainLine(prev => [...prev, newTrainLine])

    return newTrainLine
  }

  const removeTrainLine = (removeId: string) => {
    const trainLineAfterRemoved = (prevState: TrainLineType[]) =>
      prevState.filter(({ id }: TrainLineType) => id !== removeId)

    setTrainLine(trainLineAfterRemoved)
  }

  const getTrainLineById = (selectedId: string): TrainLineType | undefined =>
    trainLine.find(({ id }) => id === selectedId)

  return { createTrainLine, removeTrainLine, getTrainLineById }
}
