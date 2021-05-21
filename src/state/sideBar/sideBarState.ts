import {
  atom,
  SetterOrUpdater,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil'

export type SideBarContentType = 'select_train' | 'select_line' | 'append'

export type SideBarType = {
  isOpen: boolean
  menu: SideBarContentType | null
}

const sideBarState = atom<SideBarType>({
  key: 'sideBar',
  default: {
    isOpen: false,
    menu: null,
  },
})

export const useGetSideBar = (): SideBarType => useRecoilValue(sideBarState)

export const useSetSideBar = (): SetterOrUpdater<SideBarType> =>
  useSetRecoilState(sideBarState)

export const useStateSideBar = (): [
  SideBarType,
  SetterOrUpdater<SideBarType>,
] => useRecoilState(sideBarState)
