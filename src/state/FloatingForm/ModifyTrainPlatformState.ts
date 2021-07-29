import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import {
  ModifyTrainPlatformFormType,
  ModifyTrainPlatformFormStatusType,
} from 'types/FloatingForm.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

const modifyTrainPlatformFormAtom = atom<ModifyTrainPlatformFormType>({
  key: 'modifyTrainPlatformForm',
  default: {
    id: '',
    name: '',
    line: [],
    nodeNumber: 0,
  },
})

const modifyTrainPlatformFormStatusAtom = atom<ModifyTrainPlatformFormStatusType>(
  {
    key: 'idModifyingPlatformFormStatus',
    default: {
      isModifyingName: false,
      error: '',
    },
  },
)

export const useGetModifyTrainPlatformForm = (): Getter<ModifyTrainPlatformFormType> =>
  useRecoilValue(modifyTrainPlatformFormAtom)

export const useSetModifyTrainPlatformForm = (): Setter<ModifyTrainPlatformFormType> =>
  useSetRecoilState(modifyTrainPlatformFormAtom)

export const useStateModifyTrainPlatformForm = (): GetterAndSetter<ModifyTrainPlatformFormType> =>
  useRecoilState(modifyTrainPlatformFormAtom)

export const useGetModifyTrainPlatformFormStatus = (): Getter<ModifyTrainPlatformFormStatusType> =>
  useRecoilValue(modifyTrainPlatformFormStatusAtom)

export const useSetModifyTrainPlatformFormStatus = (): Setter<ModifyTrainPlatformFormStatusType> =>
  useSetRecoilState(modifyTrainPlatformFormStatusAtom)

export const useStateModifyTrainPlatformFormStatus = (): GetterAndSetter<ModifyTrainPlatformFormStatusType> =>
  useRecoilState(modifyTrainPlatformFormStatusAtom)
