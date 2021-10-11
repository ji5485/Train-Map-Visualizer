import { atom, useRecoilState, useResetRecoilState, Resetter } from 'recoil'
import { ModifyTrainLineFormType } from '../../types/FloatingForm.types'
import { Getter, Setter } from '../../types/RecoilMethods.types'

const modifyTrainLineFormAtom = atom<ModifyTrainLineFormType>({
  key: 'modifyTrainLineForm',
  default: {
    selectedTrainLine: null,
    connectedTrainPlatform: [],
    time: 0,
  },
})

export const useManageModifyTrainLineForm = (): {
  modifyTrainLineForm: Getter<ModifyTrainLineFormType>
  setModifyTrainLineForm: Setter<ModifyTrainLineFormType>
  resetModifyTrainLineForm: Resetter
} => {
  const [modifyTrainLineForm, setModifyTrainLineForm] = useRecoilState(
    modifyTrainLineFormAtom,
  )
  const resetModifyTrainLineForm = useResetRecoilState(modifyTrainLineFormAtom)

  return {
    modifyTrainLineForm,
    setModifyTrainLineForm,
    resetModifyTrainLineForm,
  }
}
