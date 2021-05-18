import {
  atom,
  SetterOrUpdater,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil'

export type CurrentModeType = 'hand' | 'select' | 'append' | 'line'

type SideBarType = {
  isOpen: boolean
  currentMode: CurrentModeType
}

const sideBarState = atom<SideBarType>({
  key: 'sideBar',
  default: {
    isOpen: false,
    currentMode: 'hand',
  },
})

export const useGetSideBar = (): SideBarType => useRecoilValue(sideBarState)

export const useSetSideBar = (): SetterOrUpdater<SideBarType> =>
  useSetRecoilState(sideBarState)

export const useStateSideBar = (): [
  SideBarType,
  SetterOrUpdater<SideBarType>,
] => useRecoilState(sideBarState)
