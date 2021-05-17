import {
  atom,
  SetterOrUpdater,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil'

type SideBarType = {
  isOpen: boolean
}

const sideBarState = atom<SideBarType>({
  key: 'sideBar',
  default: {
    isOpen: false,
  },
})

export const useGetSideBar = (): SideBarType => useRecoilValue(sideBarState)

export const useSetSideBar = (): SetterOrUpdater<SideBarType> =>
  useSetRecoilState(sideBarState)
