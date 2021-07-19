import { atom, useSetRecoilState, useRecoilValue } from 'recoil'
import { SelectTrainPlatformFormType } from 'types/FloatingForm.types'
import { Getter, Setter } from 'types/RecoilMethods.types'

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
