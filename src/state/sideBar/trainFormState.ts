import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  SetterOrUpdater,
  useRecoilState,
} from 'recoil'
import { TrainLineType } from 'state/train/trainLineState'

type TrainFormType = {
  line: TrainLineType['id']
  name: string
}

const trainFormAtom = atom<TrainFormType>({
  key: 'trainForm',
  default: {
    line: '',
    name: '',
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
