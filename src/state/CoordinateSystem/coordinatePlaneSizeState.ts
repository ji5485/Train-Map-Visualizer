import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import { CoordinatePlaneSizeType } from '../../types/CoordinateSystem.types'
import {
  Getter,
  Setter,
  GetterAndSetter,
} from '../../types/RecoilMethods.types'

const coordinatePlaneZoomAtom = atom<number>({
  key: 'coordinatePlaneZoom',
  default: 1,
})

const coordinatePlaneSizeAtom = atom<CoordinatePlaneSizeType>({
  key: 'coordinatePlaneSize',
  default: {
    width: 0,
    height: 0,
  },
})

const calculatedCoordinatePlaneSizeSelector = selector<CoordinatePlaneSizeType>(
  {
    key: 'calculatedCoordinatePlaneSize',
    get: ({ get }) => {
      const zoom = get(coordinatePlaneZoomAtom)
      const { width, height } = get(coordinatePlaneSizeAtom)

      return { width: width * zoom * 120, height: height * zoom * 120 }
    },
  },
)

// Coordinate Plane Zoom Hooks
export const useGetCoordinatePlaneZoom = (): Getter<number> =>
  useRecoilValue(coordinatePlaneZoomAtom)

export const useStateCoordinatePlaneZoom = (): GetterAndSetter<number> =>
  useRecoilState(coordinatePlaneZoomAtom)

// Coordinate Plane Size Hooks
export const useGetCoordinatePlaneSize = (): Getter<CoordinatePlaneSizeType> =>
  useRecoilValue(coordinatePlaneSizeAtom)

export const useSetCoordinatePlaneSize = (): Setter<CoordinatePlaneSizeType> =>
  useSetRecoilState(coordinatePlaneSizeAtom)

export const useGetCalculatedCoordinatePlaneSize =
  (): Getter<CoordinatePlaneSizeType> =>
    useRecoilValue(calculatedCoordinatePlaneSizeSelector)
