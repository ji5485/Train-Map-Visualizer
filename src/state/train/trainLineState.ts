import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
} from 'recoil'
import TRAIN_LINE_COLOR from 'utils/trainLineColor'
import shortId from 'utils/shortId'

type TrainLineColor = keyof typeof TRAIN_LINE_COLOR

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
]

const trainLineAtom = atom<TrainLineType[]>({
  key: 'trainLine',
  default: trainLineDefaultValue,
})

export const useGetTrainLine = (): TrainLineType[] =>
  useRecoilValue(trainLineAtom)

export const useSetTrainLine = (): SetterOrUpdater<TrainLineType[]> =>
  useSetRecoilState(trainLineAtom)

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
