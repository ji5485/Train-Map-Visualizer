import { useState, useEffect } from 'react'
import { useGetCoordinatePlaneSize } from 'state/CoordinateSystem/coordinatePlaneSizeState'

type PositionType = {
  row: number
  column: number
}

type NextNodeNumberType = {
  top: number
  right: number
  bottom: number
  left: number
}

type useGetPositionByNodeNumberType = {
  position: PositionType
  nextNodeNumber: NextNodeNumberType
  getPositionByNodeNumber: (number: number) => PositionType
  getNodeNumberByPosition: (row: number, column: number) => number
}

export default function useGetPositionByNodeNumber(
  nodeNumber?: number | undefined,
): useGetPositionByNodeNumberType {
  const { width } = useGetCoordinatePlaneSize()
  const [position, setPosition] = useState<PositionType>({
    row: 0,
    column: 0,
  })
  const [nextNodeNumber, setNextNodeNumber] = useState<NextNodeNumberType>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  const getPositionByNodeNumber = (number: number) => ({
    row: Math.floor(number / width),
    column: number % width,
  })

  const getNodeNumberByPosition = (row: number, column: number) =>
    row * width + column

  useEffect(() => {
    if (nodeNumber === undefined) return

    setPosition(getPositionByNodeNumber(nodeNumber))
    setNextNodeNumber({
      top: nodeNumber - width,
      right: nodeNumber + 1,
      bottom: nodeNumber + width,
      left: nodeNumber - 1,
    })
  }, [width])

  return {
    position,
    nextNodeNumber,
    getPositionByNodeNumber,
    getNodeNumberByPosition,
  }
}
