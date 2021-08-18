import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import { FindTrainPathFormType } from 'types/FloatingForm.types'
import { Getter, Setter } from 'types/RecoilMethods.types'

const findTrainPathFormAtom = atom<FindTrainPathFormType>({
  key: 'findTrainPathForm',
  default: {
    start: null,
    destination: null,
  },
})

export const useManageFindTrainPathForm = (): {
  findTrainPathForm: Getter<FindTrainPathFormType>
  setFindTrainPathForm: Setter<FindTrainPathFormType>
  resetFindTrainPathForm: Resetter
} => {
  const [findTrainPathForm, setFindTrainPathForm] = useRecoilState(
    findTrainPathFormAtom,
  )
  const resetFindTrainPathForm = useResetRecoilState(findTrainPathFormAtom)

  return {
    findTrainPathForm,
    setFindTrainPathForm,
    resetFindTrainPathForm,
  }
}
