import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
  selectorFamily,
  useRecoilState,
} from 'recoil'
import { TrainLineColorName } from 'state/train/trainLineColorState'

export type TrainLineType = {
  id: string
  name: string
  color: TrainLineColorName
}

const trainLineAtom = atom<TrainLineType[]>({
  key: 'trainLine',
  default: [],
})

const filteredTrainLineSelector = selectorFamily<TrainLineType[], string>({
  key: 'filteredTrainLine',
  get: trainLineName => ({ get }) => {
    const trainLine = get(trainLineAtom)

    return trainLineName === ''
      ? trainLine
      : trainLine.filter(({ name }) => name.includes(trainLineName))
  },
})

export const useGetTrainLine = (): TrainLineType[] =>
  useRecoilValue(trainLineAtom)

export const useSetTrainLine = (): SetterOrUpdater<TrainLineType[]> =>
  useSetRecoilState(trainLineAtom)

export const useStateTrainLine = (): [
  TrainLineType[],
  SetterOrUpdater<TrainLineType[]>,
] => useRecoilState(trainLineAtom)

export const useGetFilteredTrainLine = (
  trainLineName: string,
): TrainLineType[] => useRecoilValue(filteredTrainLineSelector(trainLineName))

export const useGetTrainLineById = (selectedId: string): TrainLineType => {
  const selectedTrainLine = useGetTrainLine().find(
    ({ id }) => id === selectedId,
  )

  console.log(selectedTrainLine)

  const defaultTrainLine: TrainLineType = {
    id: '',
    name: '',
    color: 'indigo',
  }

  return selectedTrainLine ?? defaultTrainLine
}
