import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { FloatingFormType } from '../../types/FloatingForm.types'
import { Getter, Setter, GetterAndSetter } from '../../types/RecoilMethods.types'

const floatingFormState = atom<FloatingFormType>({
  key: 'floatingForm',
  default: {
    isOpen: false,
    menu: null,
  },
})

export const useGetFloatingForm = (): Getter<FloatingFormType> =>
  useRecoilValue(floatingFormState)

export const useSetFloatingForm = (): Setter<FloatingFormType> =>
  useSetRecoilState(floatingFormState)

export const useStateFloatingForm = (): GetterAndSetter<FloatingFormType> =>
  useRecoilState(floatingFormState)
