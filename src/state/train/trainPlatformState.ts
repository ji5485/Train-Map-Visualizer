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
}

type TrainPlatformDatabaseType = {
  [key: string]: TrainPlatformType[]
}

const trainPlatformAtom = atom<TrainPlatformDatabaseType>({
  key: 'trainPlatform',
  default: {},
})

export const useGetTrainPlatform = (): TrainPlatformDatabaseType =>
  useRecoilValue(trainPlatformAtom)

export const useSetTrainPlatform = (): SetterOrUpdater<TrainPlatformDatabaseType> =>
  useSetRecoilState(trainPlatformAtom)

export const useStateTrainPlatform = (): [
  TrainPlatformDatabaseType,
  SetterOrUpdater<TrainPlatformDatabaseType>,
] => useRecoilState(trainPlatformAtom)
