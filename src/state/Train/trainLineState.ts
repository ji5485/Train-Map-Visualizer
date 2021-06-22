import { atom, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { TrainLineType, TrainLineMatrixType } from 'types/Train.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'
import { TRAIN_MATRIX_MAX_LENGTH } from 'utils/constants'

const trainLineAtom = atom<TrainLineMatrixType>({
  key: 'trainLine',
  default: new Array<(TrainLineType | null)[]>(
    TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
  ).fill(
    new Array<TrainLineType | null>(
      TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
    ).fill(null),
  ),
})

export const useGetTrainLine = (): Getter<TrainLineMatrixType> =>
  useRecoilValue(trainLineAtom)

export const useSetTrainLine = (): Setter<TrainLineMatrixType> =>
  useSetRecoilState(trainLineAtom)

export const useStateTrainLine = (): GetterAndSetter<TrainLineMatrixType> =>
  useRecoilState(trainLineAtom)
