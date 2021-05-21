import { atom, useRecoilValue, SetterOrUpdater, useRecoilState } from 'recoil'

export const coordinatePlaneZoomAtom = atom<number>({
  key: 'coordinatePlaneZoom',
  default: 1,
})

export const useGetCoordinatePlaneZoom = (): number =>
  useRecoilValue(coordinatePlaneZoomAtom)

export const useStateCoordinatePlaneZoom = (): [
  number,
  SetterOrUpdater<number>,
] => useRecoilState(coordinatePlaneZoomAtom)
