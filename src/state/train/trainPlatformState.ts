import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  SetterOrUpdater,
} from 'recoil'

const TRAIN_PLATFORM_MATRIX_MAX_LENGTH = 50

export type TrainPlatformType = {
  id: string
  name: string
  line: string[]
}

type TrainPlatformMatrixType = (TrainPlatformType | null)[][]

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

export const useGetTrainPlatform = (): TrainPlatformMatrixType =>
  useRecoilValue(trainPlatformAtom)

export const useSetTrainPlatform = (): SetterOrUpdater<TrainPlatformMatrixType> =>
  useSetRecoilState(trainPlatformAtom)

export const useStateTrainPlatform = (): [
  TrainPlatformMatrixType,
  SetterOrUpdater<TrainPlatformMatrixType>,
] => useRecoilState(trainPlatformAtom)
