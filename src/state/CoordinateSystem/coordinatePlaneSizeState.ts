import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { coordinatePlaneZoomAtom } from 'state/CoordinateSystem/coordinatePlaneZoomState'
import { CoordinatePlaneSizeType } from 'types/CoordinateSystem.types'
import { Getter, Setter } from 'types/RecoilMethods.types'

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

export const useGetCoordinatePlaneSize = (): Getter<CoordinatePlaneSizeType> =>
  useRecoilValue(coordinatePlaneSizeAtom)

export const useSetCoordinatePlaneSize = (): Setter<CoordinatePlaneSizeType> =>
  useSetRecoilState(coordinatePlaneSizeAtom)

export const useGetCalculatedCoordinatePlaneSize = (): Getter<CoordinatePlaneSizeType> =>
  useRecoilValue(calculatedCoordinatePlaneSizeSelector)
