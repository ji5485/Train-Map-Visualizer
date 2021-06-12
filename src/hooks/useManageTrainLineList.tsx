import shortId from 'utils/shortId'
import {
  TrainLineItemType,
  useStateTrainLineList,
} from 'state/train/trainLineListState'
import { TrainLineColorName } from 'state/train/trainLineColorState'

type useManageTrainLineListType = {
  createTrainLine: (
    name: string,
    color: TrainLineColorName,
  ) => TrainLineItemType
  removeTrainLine: (removeId: string) => void
  getTrainLineItemById: (selectedId: string) => TrainLineItemType | undefined
}

export default function useManageTrainLineList(): useManageTrainLineListType {
  const [trainLineList, setTrainLineList] = useStateTrainLineList()

  const createTrainLine = (
    name: string,
    color: TrainLineColorName,
  ): TrainLineItemType => {
    const newTrainLine = {
      id: shortId(),
      name,
      color,
    }

    setTrainLineList(prev => [...prev, newTrainLine])

    return newTrainLine
  }

  const removeTrainLine = (removeId: string) => {
    const trainLineAfterRemoved = (prevState: TrainLineItemType[]) =>
      prevState.filter(({ id }: TrainLineItemType) => id !== removeId)

    setTrainLineList(trainLineAfterRemoved)
  }

  const getTrainLineItemById = (
    selectedId: string,
  ): TrainLineItemType | undefined =>
    trainLineList.find(({ id }) => id === selectedId)

  return { createTrainLine, removeTrainLine, getTrainLineItemById }
}
