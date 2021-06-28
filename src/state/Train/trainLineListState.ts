import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  selectorFamily,
  useRecoilState,
} from 'recoil'
import { TrainLineItemType } from 'types/Train.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

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

export const useGetTrainLineList = (): Getter<TrainLineItemType[]> =>
  useRecoilValue(trainLineListAtom)

export const useSetTrainLineList = (): Setter<TrainLineItemType[]> =>
  useSetRecoilState(trainLineListAtom)

export const useStateTrainLineList = (): GetterAndSetter<TrainLineItemType[]> =>
  useRecoilState(trainLineListAtom)

export const useGetFilteredTrainLineList = (
  trainLineName: string,
): Getter<TrainLineItemType[]> =>
  useRecoilValue(filteredTrainLineListSelector(trainLineName))

export const useGetTrainLineItemById = (
  selectedId: string,
): Getter<TrainLineItemType> => {
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