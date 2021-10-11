import { atom, useRecoilState, useResetRecoilState, Resetter } from 'recoil'
import {
  ModifyTrainPlatformFormType,
  ModifyTrainPlatformFormStatusType,
} from '../../types/FloatingForm.types'
import { Getter, Setter } from '../../types/RecoilMethods.types'

const modifyTrainPlatformFormAtom = atom<ModifyTrainPlatformFormType>({
  key: 'modifyTrainPlatformForm',
  default: {
    id: '',
    name: '',
    line: [],
    nodeNumber: 0,
  },
})

const modifyTrainPlatformFormStatusAtom =
  atom<ModifyTrainPlatformFormStatusType>({
    key: 'idModifyingPlatformFormStatus',
    default: {
      isModifyingName: false,
      error: '',
    },
  })

export const useManageModifyTrainPlatformForm = (): {
  modifyTrainPlatformForm: Getter<ModifyTrainPlatformFormType>
  setModifyTrainPlatformForm: Setter<ModifyTrainPlatformFormType>
  resetModifyTrainPlatformForm: Resetter
} => {
  const [modifyTrainPlatformForm, setModifyTrainPlatformForm] = useRecoilState(
    modifyTrainPlatformFormAtom,
  )
  const resetModifyTrainPlatformForm = useResetRecoilState(
    modifyTrainPlatformFormAtom,
  )

  return {
    modifyTrainPlatformForm,
    setModifyTrainPlatformForm,
    resetModifyTrainPlatformForm,
  }
}

export const useManageModifyTrainPlatformFormStatus = (): {
  modifyTrainPlatformFormStatus: Getter<ModifyTrainPlatformFormStatusType>
  setModifyTrainPlatformFormStatus: Setter<ModifyTrainPlatformFormStatusType>
  resetModifyTrainPlatformFormStatus: Resetter
} => {
  const [modifyTrainPlatformFormStatus, setModifyTrainPlatformFormStatus] =
    useRecoilState(modifyTrainPlatformFormStatusAtom)
  const resetModifyTrainPlatformFormStatus = useResetRecoilState(
    modifyTrainPlatformFormStatusAtom,
  )

  return {
    modifyTrainPlatformFormStatus,
    setModifyTrainPlatformFormStatus,
    resetModifyTrainPlatformFormStatus,
  }
}
