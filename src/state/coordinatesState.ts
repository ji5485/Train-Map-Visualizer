import { atom, useRecoilValue, SetterOrUpdater, useRecoilState } from 'recoil'

const coordinatesZoomState = atom<number>({
  key: 'coordinatesZoom',
  default: 1,
})

export const useGetCoordinatesZoom = (): number =>
  useRecoilValue(coordinatesZoomState)

export const useStateCoordinatesZoom = (): [number, SetterOrUpdater<number>] =>
  useRecoilState(coordinatesZoomState)

// type coordinatesSizeType = {
//   width: number
//   height: number
// }

// const coordinatesSizeState = atom<coordinatesSizeType>({
//   key: 'coordinatesSize',
//   default: {
//     width: 0,
//     height: 0,
//   },
// })
