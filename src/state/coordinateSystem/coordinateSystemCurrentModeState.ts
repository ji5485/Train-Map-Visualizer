import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
  useRecoilState,
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

export const useStateCoordinateSystemCurrentMode = (): [
  CurrentModeType,
  SetterOrUpdater<CurrentModeType>,
] => useRecoilState(coordinateSystemCurrentModeAtom)
