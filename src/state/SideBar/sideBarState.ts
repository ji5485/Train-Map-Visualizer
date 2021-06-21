import { atom, useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { SideBarType } from 'types/SideBar.types'
import { Getter, Setter, GetterAndSetter } from 'types/RecoilMethods.types'

const sideBarState = atom<SideBarType>({
  key: 'sideBar',
  default: {
    isOpen: false,
    menu: null,
  },
})

export const useGetSideBar = (): Getter<SideBarType> =>
  useRecoilValue(sideBarState)

export const useSetSideBar = (): Setter<SideBarType> =>
  useSetRecoilState(sideBarState)

export const useStateSideBar = (): GetterAndSetter<SideBarType> =>
  useRecoilState(sideBarState)
