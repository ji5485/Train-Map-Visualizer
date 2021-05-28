import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
  selectorFamily,
} from 'recoil'
import shortId from 'utils/shortId'

export type TrainLineType = {
  id: string
  name: string
  color: TrainLineColor
}

const trainLineDefaultValue: TrainLineType[] = [
  {
    id: '1',
    name: '1호선',
    color: 'indigo',
  },
  {
    id: '2',
    name: '2호선',
    color: 'teal',
  },
  {
    id: '3',
    name: '3호선',
    color: 'orange',
  },
  {
    id: '4',
    name: '4호선',
    color: 'blue',
  },
  {
    id: '5',
    name: '5호선',
    color: 'violet',
  },
]

const trainLineAtom = atom<TrainLineType[]>({
  key: 'trainLine',
  default: trainLineDefaultValue,
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

export const useGetFilteredTrainLine = (
  trainLineName: string,
): TrainLineType[] => useRecoilValue(filteredTrainLineSelector(trainLineName))

export const useAppendTrainLine = (
  name: string,
  color: TrainLineColor,
): void => {
  const setTrainLine = useSetTrainLine()

  const newTrainLine = {
    id: shortId(),
    name,
    color,
  }

  setTrainLine(prev => [...prev, newTrainLine])
}

export const useRemoveTrainLine = (removeId: string): void => {
  const setTrainLine = useSetTrainLine()

  const trainLineAfterRemoved = (prevState: TrainLineType[]) =>
    prevState.filter(({ id }: TrainLineType) => id !== removeId)

  setTrainLine(trainLineAfterRemoved)
}

export const useGetTrainLineById = (selectedId: string): TrainLineType => {
  const selectedTrainLine = useGetTrainLine().find(
    ({ id }) => id === selectedId,
  )

  const defaultTrainLine: TrainLineType = {
    id: '',
    name: '',
    color: 'indigo',
  }

  return selectedTrainLine ?? defaultTrainLine
}
