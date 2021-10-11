import shortId from '../utils//shortId'
import { useManageTrainLineItem } from '../state/Train/TrainLineItemState'
import { TrainLineItemType, TrainLineColorName } from '../types/Train.types'

type useManageTrainLineListType = {
  createTrainLine: (
    name: string,
    color: TrainLineColorName,
  ) => TrainLineItemType
  removeTrainLine: (removeId: string) => void
  getTrainLineItemById: (selectedId: string) => TrainLineItemType | undefined
}

export default function useManageTrainLineList(): useManageTrainLineListType {
  const { trainLineItem, setTrainLineItem } = useManageTrainLineItem()

  const createTrainLine = (
    name: string,
    color: TrainLineColorName,
  ): TrainLineItemType => {
    const newTrainLine = {
      id: shortId(),
      name,
      color,
    }

    setTrainLineItem(prev => [...prev, newTrainLine])

    return newTrainLine
  }

  const removeTrainLine = (removeId: string) => {
    const trainLineAfterRemoved = (prevState: TrainLineItemType[]) =>
      prevState.filter(({ id }: TrainLineItemType) => id !== removeId)

    setTrainLineItem(trainLineAfterRemoved)
  }

  const getTrainLineItemById = (
    selectedId: string,
  ): TrainLineItemType | undefined =>
    trainLineItem.find(({ id }) => id === selectedId)

  return { createTrainLine, removeTrainLine, getTrainLineItemById }
}
