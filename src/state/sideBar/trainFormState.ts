import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  SetterOrUpdater,
  useRecoilState,
  useResetRecoilState,
  Resetter,
} from 'recoil'
import { TrainLineItemType } from 'state/train/trainLineListState'

type TrainFormType = {
  selectedTrainLine: TrainLineItemType
  trainPlatform: {
    name: string
    isValid: boolean
    error: string
  }
}

export const defaultSelectedTrainLine: TrainLineItemType = {
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
      error: '',
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
