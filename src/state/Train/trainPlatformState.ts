import { atom, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { TrainPlatformType, TrainPlatformMatrixType } from 'types/Train.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

const TRAIN_PLATFORM_MATRIX_MAX_LENGTH = 50

const trainPlatformAtom = atom<TrainPlatformMatrixType>({
  key: 'trainPlatform',
  default: new Array<(TrainPlatformType | null)[]>(
    TRAIN_PLATFORM_MATRIX_MAX_LENGTH,
  ).fill(
    new Array<TrainPlatformType | null>(TRAIN_PLATFORM_MATRIX_MAX_LENGTH).fill(
      null,
    ),
  ),
})

export const useGetTrainPlatform = (): Getter<TrainPlatformMatrixType> =>
  useRecoilValue(trainPlatformAtom)

export const useSetTrainPlatform = (): Setter<TrainPlatformMatrixType> =>
  useSetRecoilState(trainPlatformAtom)

export const useStateTrainPlatform = (): GetterAndSetter<TrainPlatformMatrixType> =>
  useRecoilState(trainPlatformAtom)
