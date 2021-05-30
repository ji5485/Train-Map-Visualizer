import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  SetterOrUpdater,
  useRecoilState,
} from 'recoil'
import { TrainLineType } from 'state/train/trainLineState'

type TrainFormType = {
  selectedTrainLine: TrainLineType
  trainLineName: string
  trainPlatformName: string
}

export const defaultSelectedTrainLine: TrainLineType = {
  id: '',
  name: '',
  color: 'indigo',
}

const trainFormAtom = atom<TrainFormType>({
  key: 'trainForm',
  default: {
    selectedTrainLine: defaultSelectedTrainLine,
    trainLineName: '',
    trainPlatformName: '',
  },
})

export const useGetTrainForm = (): TrainFormType =>
  useRecoilValue(trainFormAtom)

export const useSetTrainForm = (): SetterOrUpdater<TrainFormType> =>
  useSetRecoilState(trainFormAtom)

export const useStateTrainForm = (): [
  TrainFormType,
  SetterOrUpdater<TrainFormType>,
] => useRecoilState(trainFormAtom)
