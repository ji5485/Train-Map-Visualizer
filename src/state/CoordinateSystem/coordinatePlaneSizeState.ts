import { useEffect } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { coordinatePlaneZoomAtom } from 'state/CoordinateSystem/coordinatePlaneZoomState'
import { CoordinatePlaneSizeType } from 'types/CoordinateSystem.types'
import { Getter } from 'types/RecoilMethods.types'

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

export const useSetCoordinatePlaneSize = (
  width: number,
  height: number,
): void => {
  const setCoordinatePlaneSize = useSetRecoilState(coordinatePlaneSizeAtom)

  useEffect(() => {
    setCoordinatePlaneSize({ width, height })
  }, [])
}

export const useGetCalculatedCoordinatePlaneSize = (): Getter<CoordinatePlaneSizeType> =>
  useRecoilValue(calculatedCoordinatePlaneSizeSelector)
