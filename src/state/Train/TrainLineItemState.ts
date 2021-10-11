import {
  atom,
  useRecoilValue,
  selectorFamily,
  useRecoilState,
  Resetter,
  useResetRecoilState,
} from 'recoil'
import { TrainLineItemType, TrainLineColorName } from '../../types/Train.types'
import { Getter, Setter } from '../../types/RecoilMethods.types'

const trainLineItemAtom = atom<TrainLineItemType[]>({
  key: 'trainLineItem',
  default: [],
})

const filteredTrainLineItemSelector = selectorFamily<
  TrainLineItemType[],
  string | string[]
>({
  key: 'filteredTrainLineList',
  get:
    trainLineName =>
    ({ get }) => {
      const trainLine = get(trainLineItemAtom)

      if (typeof trainLineName === 'string')
        return trainLineName === ''
          ? trainLine
          : trainLine.filter(({ name }) => name.includes(trainLineName))

      return trainLine.filter(
        ({ name }) =>
          !trainLineName.find(alreadyUseName => alreadyUseName === name),
      )
    },
})

export const useManageTrainLineItem = (): {
  trainLineItem: Getter<TrainLineItemType[]>
  setTrainLineItem: Setter<TrainLineItemType[]>
  resetTrainLineItem: Resetter
} => {
  const [trainLineItem, setTrainLineItem] = useRecoilState(trainLineItemAtom)
  const resetTrainLineItem = useResetRecoilState(trainLineItemAtom)

  return {
    trainLineItem,
    setTrainLineItem,
    resetTrainLineItem,
  }
}

export const useGetFilteredTrainLineItem = (
  trainLineName: string | string[],
): Getter<TrainLineItemType[]> =>
  useRecoilValue(filteredTrainLineItemSelector(trainLineName))

export const useGetTrainLineItemById = (
  selectedId: string,
): Getter<TrainLineItemType> => {
  const selectedTrainLine = useRecoilValue(trainLineItemAtom).find(
    ({ id }) => id === selectedId,
  )

  const defaultTrainLine: TrainLineItemType = {
    id: '',
    name: '',
    color: 'indigo',
  }

  return selectedTrainLine ?? defaultTrainLine
}

export const useGetTrainLineItemByColor = (
  selectedColor: TrainLineColorName,
): Getter<TrainLineItemType> => {
  const selectedTrainLine = useRecoilValue(trainLineItemAtom).find(
    ({ color }) => color === selectedColor,
  )

  const defaultTrainLine: TrainLineItemType = {
    id: '',
    name: '',
    color: 'indigo',
  }

  return selectedTrainLine ?? defaultTrainLine
}
