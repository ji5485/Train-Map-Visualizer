import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
  Resetter,
} from 'recoil'
import { TrainFormType } from 'types/SideBar.types'
import { TrainLineItemType } from 'types/Train.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

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

export const useGetTrainForm = (): Getter<TrainFormType> =>
  useRecoilValue(trainFormAtom)

export const useSetTrainForm = (): Setter<TrainFormType> =>
  useSetRecoilState(trainFormAtom)

export const useStateTrainForm = (): GetterAndSetter<TrainFormType> =>
  useRecoilState(trainFormAtom)

export const useResetTrainForm = (): Resetter =>
  useResetRecoilState(trainFormAtom)
