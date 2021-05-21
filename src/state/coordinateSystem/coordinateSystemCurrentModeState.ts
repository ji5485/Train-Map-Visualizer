import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
} from 'recoil'

export type CurrentModeType = 'hand' | 'select' | 'append' | 'line'

const coordinateSystemCurrentModeAtom = atom<CurrentModeType>({
  key: 'coordinateSystemCurrentMode',
  default: 'hand',
})

export const useGetCoordinateSystemCurrentMode = (): CurrentModeType =>
  useRecoilValue(coordinateSystemCurrentModeAtom)

export const useSetCoordinateSystemCurrentMode = (): SetterOrUpdater<CurrentModeType> =>
  useSetRecoilState(coordinateSystemCurrentModeAtom)
