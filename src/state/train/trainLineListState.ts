import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
  selectorFamily,
  useRecoilState,
} from 'recoil'
import { TrainLineColorName } from 'state/train/trainLineColorState'

export type TrainLineItemType = {
  id: string
  name: string
  color: TrainLineColorName
}

const trainLineListAtom = atom<TrainLineItemType[]>({
  key: 'trainLineList',
  default: [],
})

const filteredTrainLineListSelector = selectorFamily<
  TrainLineItemType[],
  string
>({
  key: 'filteredTrainLineList',
  get: trainLineName => ({ get }) => {
    const trainLine = get(trainLineListAtom)

    return trainLineName === ''
      ? trainLine
      : trainLine.filter(({ name }) => name.includes(trainLineName))
  },
})

export const useGetTrainLineList = (): TrainLineItemType[] =>
  useRecoilValue(trainLineListAtom)

export const useSetTrainLineList = (): SetterOrUpdater<TrainLineItemType[]> =>
  useSetRecoilState(trainLineListAtom)

export const useStateTrainLineList = (): [
  TrainLineItemType[],
  SetterOrUpdater<TrainLineItemType[]>,
] => useRecoilState(trainLineListAtom)

export const useGetFilteredTrainLineList = (
  trainLineName: string,
): TrainLineItemType[] =>
  useRecoilValue(filteredTrainLineListSelector(trainLineName))

export const useGetTrainLineItemById = (
  selectedId: string,
): TrainLineItemType => {
  const selectedTrainLine = useGetTrainLineList().find(
    ({ id }) => id === selectedId,
  )

  const defaultTrainLine: TrainLineItemType = {
    id: '',
    name: '',
    color: 'indigo',
  }

  return selectedTrainLine ?? defaultTrainLine
}
