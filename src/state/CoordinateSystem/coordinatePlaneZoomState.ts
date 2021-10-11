import { atom, useRecoilValue, useRecoilState } from 'recoil'
import { Getter, GetterAndSetter } from '../../types/RecoilMethods.types'

export const coordinatePlaneZoomAtom = atom<number>({
  key: 'coordinatePlaneZoom',
  default: 1,
})

export const useGetCoordinatePlaneZoom = (): Getter<number> =>
  useRecoilValue(coordinatePlaneZoomAtom)

export const useStateCoordinatePlaneZoom = (): GetterAndSetter<number> =>
  useRecoilState(coordinatePlaneZoomAtom)
