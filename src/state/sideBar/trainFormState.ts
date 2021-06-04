import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  SetterOrUpdater,
  useRecoilState,
  useResetRecoilState,
  Resetter,
} from 'recoil'
import { TrainLineType } from 'state/train/trainLineState'

type TrainFormType = {
  selectedTrainLine: TrainLineType
  trainPlatform: {
    name: string
    isValid: boolean
  }
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
    trainPlatform: {
      name: '',
      isValid: false,
    },
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

export const useResetTrainForm = (): Resetter =>
  useResetRecoilState(trainFormAtom)
