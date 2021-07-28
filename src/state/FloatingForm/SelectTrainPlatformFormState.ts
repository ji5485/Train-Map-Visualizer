import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { SelectTrainPlatformFormType } from 'types/FloatingForm.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

const selectTrainPlatformFormAtom = atom<SelectTrainPlatformFormType>({
  key: 'selectTrainPlatformForm',
  default: {
    id: '',
    name: '',
    line: [],
    nodeNumber: 0,
  },
})

export const useGetSelectTrainPlatformForm = (): Getter<SelectTrainPlatformFormType> =>
  useRecoilValue(selectTrainPlatformFormAtom)

export const useSetSelectTrainPlatformForm = (): Setter<SelectTrainPlatformFormType> =>
  useSetRecoilState(selectTrainPlatformFormAtom)

export const useStateSelectTrainPlatformForm = (): GetterAndSetter<SelectTrainPlatformFormType> =>
  useRecoilState(selectTrainPlatformFormAtom)
