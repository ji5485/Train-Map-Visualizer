import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { coordinatesZoomState } from 'state/coordinatesZoomState'
import { useEffect } from 'react'

type CoordinatesSizeType = {
  width: number
  height: number
}

const coordinatesSizeState = atom<CoordinatesSizeType>({
  key: 'coordinatesSize',
  default: {
    width: 0,
    height: 0,
  },
})

const coordinatesCalculatedSizeState = selector<CoordinatesSizeType>({
  key: 'coordinatesCalculatedSize',
  get: ({ get }) => {
    const zoom = get(coordinatesZoomState)
    const { width, height } = get(coordinatesSizeState)

    return { width: width * zoom * 120, height: height * zoom * 120 }
  },
})

export const useGetCoordinatesSize = (): CoordinatesSizeType =>
  useRecoilValue(coordinatesSizeState)

export const useSetCoordinatesSize = (width: number, height: number): void => {
  const setCoordinatesSize = useSetRecoilState(coordinatesSizeState)

  useEffect(() => {
    setCoordinatesSize({ width, height })
  }, [])
}

export const useGetCoordinatesCalculatedSize = (): CoordinatesSizeType =>
  useRecoilValue(coordinatesCalculatedSizeState)
