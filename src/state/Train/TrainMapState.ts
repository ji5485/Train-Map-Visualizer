import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import {
  TrainPlatformType,
  TrainPlatformMatrixType,
  TrainLineType,
  TrainLineMatrixType,
} from 'types/Train.types'
import { Getter, Setter } from 'types/RecoilMethods.types'
import { TRAIN_MATRIX_MAX_LENGTH } from 'utils/constants'

const trainPlatformMatrixAtom = atom<TrainPlatformMatrixType>({
  key: 'trainPlatformMatrix',
  default: new Array<(TrainPlatformType | null)[]>(
    TRAIN_MATRIX_MAX_LENGTH,
  ).fill(
    new Array<TrainPlatformType | null>(TRAIN_MATRIX_MAX_LENGTH).fill(null),
  ),
})

const trainLineMatrixAtom = atom<TrainLineMatrixType>({
  key: 'trainLineMatrix',
  default: new Array<(TrainLineType | null)[]>(
    TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
  ).fill(
    new Array<TrainLineType | null>(
      TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
    ).fill(null),
  ),
})

export const useManageTrainPlatform = (): {
  trainPlatformMatrix: Getter<TrainPlatformMatrixType>
  setTrainPlatformMatrix: Setter<TrainPlatformMatrixType>
  resetTrainPlatformMatrix: Resetter
} => {
  const [trainPlatformMatrix, setTrainPlatformMatrix] = useRecoilState(
    trainPlatformMatrixAtom,
  )
  const resetTrainPlatformMatrix = useResetRecoilState(trainPlatformMatrixAtom)

  return {
    trainPlatformMatrix,
    setTrainPlatformMatrix,
    resetTrainPlatformMatrix,
  }
}

export const useManageTrainLine = (): {
  trainLineMatrix: Getter<TrainLineMatrixType>
  setTrainLineMatrix: Setter<TrainLineMatrixType>
  resetTrainLineMatrix: Resetter
} => {
  const [trainLineMatrix, setTrainLineMatrix] = useRecoilState(
    trainLineMatrixAtom,
  )
  const resetTrainLineMatrix = useResetRecoilState(trainLineMatrixAtom)

  return {
    trainLineMatrix,
    setTrainLineMatrix,
    resetTrainLineMatrix,
  }
}
