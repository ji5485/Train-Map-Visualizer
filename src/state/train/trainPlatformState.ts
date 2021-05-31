import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  SetterOrUpdater,
} from 'recoil'

type TrainPlatformType = {
  id: string
  name: string
  line: string[]
}

const trainPlatformAtom = atom<TrainPlatformType[]>({
  key: 'trainPlatform',
  default: [],
})

export const useGetTrainPlatform = (): TrainPlatformType[] =>
  useRecoilValue(trainPlatformAtom)

export const useSetTrainPlatform = (): SetterOrUpdater<TrainPlatformType[]> =>
  useSetRecoilState(trainPlatformAtom)

export const useStateTrainPlatform = (): [
  TrainPlatformType[],
  SetterOrUpdater<TrainPlatformType[]>,
] => useRecoilState(trainPlatformAtom)
