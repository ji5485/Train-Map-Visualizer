import { atom, useRecoilValue, SetterOrUpdater, useRecoilState } from 'recoil'

export const coordinatesZoomState = atom<number>({
  key: 'coordinatesZoom',
  default: 1,
})

export const useGetCoordinatesZoom = (): number =>
  useRecoilValue(coordinatesZoomState)

export const useStateCoordinatesZoom = (): [number, SetterOrUpdater<number>] =>
  useRecoilState(coordinatesZoomState)
