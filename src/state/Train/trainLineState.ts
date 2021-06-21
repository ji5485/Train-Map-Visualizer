import { atom, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { TrainLineType, TrainLineMatrixType } from 'types/Train.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

const TRAIN_LINE_MATRIX_MAX_LENGTH = 50

const trainLineAtom = atom<TrainLineMatrixType>({
  key: 'trainLine',
  default: new Array<TrainLineType[][]>(TRAIN_LINE_MATRIX_MAX_LENGTH).fill(
    new Array<TrainLineType[]>(TRAIN_LINE_MATRIX_MAX_LENGTH).fill([]),
  ),
})

export const useGetTrainLine = (): Getter<TrainLineMatrixType> =>
  useRecoilValue(trainLineAtom)

export const useSetTrainLine = (): Setter<TrainLineMatrixType> =>
  useSetRecoilState(trainLineAtom)

export const useStateTrainLine = (): GetterAndSetter<TrainLineMatrixType> =>
  useRecoilState(trainLineAtom)
