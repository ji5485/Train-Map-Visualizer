import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  SetterOrUpdater,
} from 'recoil'
import { TrainLineColorName } from 'state/train/trainLineColorState'

const TRAIN_LINE_MATRIX_MAX_LENGTH = 50

export type TrainLineDirection = 'top' | 'right' | 'bottom' | 'left'

export type TrainLineType = {
  color: TrainLineColorName
  direction: TrainLineDirection
}

export type TrainLineMatrixType = TrainLineType[][][]

const trainLineAtom = atom<TrainLineMatrixType>({
  key: 'trainLine',
  default: new Array<TrainLineType[][]>(TRAIN_LINE_MATRIX_MAX_LENGTH).fill(
    new Array<TrainLineType[]>(TRAIN_LINE_MATRIX_MAX_LENGTH).fill([]),
  ),
})

export const useGetTrainLine = (): TrainLineMatrixType =>
  useRecoilValue(trainLineAtom)

export const useSetTrainLine = (): SetterOrUpdater<TrainLineMatrixType> =>
  useSetRecoilState(trainLineAtom)

export const useStateTrainLine = (): [
  TrainLineMatrixType,
  SetterOrUpdater<TrainLineMatrixType>,
] => useRecoilState(trainLineAtom)
